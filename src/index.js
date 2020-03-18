const { createResponse, getCustomFieldValues, getTaskId, updateTaskIdCustomFields } = require('./helpers.js');

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
      const id = getTaskId(commit);

      if (id) {
        const customFieldValues = getCustomFieldValues(branch);

        const response = updateTaskIdCustomFields(id, customFieldValues);

        updatedTasks.push(response);
      }
    });
  }

  const message = updatedTasks.length ? { updatedTasks } : 'No tasks were updated';

  callback(null, createResponse(200, { message }));
};
