const axios = require('axios');

const { createResponse, getCustomFieldValues, getTaskId } = require('./helpers.js');

const { LP_API_BASE_URL, LP_API_TOKEN } = process.env;

module.exports.tracker = async (event, context, callback) => {
  console.log('Event: ', JSON.stringify(event, null, 2));
  console.log('event.body', event.body);
  const githubBody = JSON.parse(event.body);

  const validBranches = ['master', 'testing', 'production', 'staging'];

  const { ref, commits } = githubBody;

  const branch = ref.split('/')[ref.split('/').length - 1];
  const updatedTasks = [];

  if (validBranches.includes(branch)) {
    commits.forEach(commit => {
      console.log('commit: ', commit);

      const id = getTaskId(commit);

      if (id) {
        const customFieldValues = getCustomFieldValues(branch);

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
            updatedTasks.push(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }

  const message = updatedTasks.length ? { updatedTasks } : 'No tasks were updated';

  callback(null, createResponse(200, { message }));
};
