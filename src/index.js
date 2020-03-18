const axios = require('axios');

const ParseGithubWebhook = require('./parseGithubWebhook');
const { createResponse } = require('./helpers.js');

const { LP_API_BASE_URL, LP_API_TOKEN } = process.env;

module.exports.tracker = async (event, context, callback) => {
  console.log('Event: ', JSON.stringify(event, null, 2));
  console.log('event.body', event.body);
  const githubBody = JSON.parse(event.body);

  const validBranches = ['master', 'testing', 'production', 'staging'];

  const { ref, commits } = githubBody;

  const branch = ref.split('/')[ref.split('/').length - 1];

  if (validBranches.includes(branch)) {
    commits.forEach(commit => {
      console.log('commit: ', commit);
      const match5OrMoreDigits = /[0-9]{5,}/; // Prevents making request for merge #'s ie "Merge pull request #12...""
      const idChecker = commit.message.match(match5OrMoreDigits);

      if (idChecker) {
        const id = idChecker[0];
        const parseGithub = new ParseGithubWebhook(branch);
        const customFieldValues = parseGithub.getcustomFieldValues();

        console.log(`Changing Task ID ${id} to: `, customFieldValues);

        const url = `${LP_API_BASE_URL}/tasks/${id}`;
        const postRequestData = {
          task: {
            custom_field_values: customFieldValues,
          },
        };
        const postRequestConfig = { headers: { Authorization: `Bearer ${LP_API_TOKEN}` } };

        axios
          .put(url, postRequestData, postRequestConfig)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }

  const message = 'Done!!';

  callback(null, createResponse(200, { message }));
};
