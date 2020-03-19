const {
  createResponse,
  getCustomFieldValues,
  getTaskIdFromCommit,
  updateTaskIdCustomFields,
  getBranchName,
} = require('./helpers.js');

module.exports.updateTask = async (event, context, callback) => {
  console.log('Event: ', JSON.stringify(event, null, 2));
  console.log('event.body', event.body);
  const githubBody = JSON.parse(event.body);

  const validBranches = ['master', 'testing', 'production', 'staging'];

  const { ref, commits } = githubBody;

  const branch = getBranchName(ref);
  const updatedTasks = [];

  if (validBranches.includes(branch)) {
    commits.forEach(commit => {
      const id = getTaskIdFromCommit(commit);

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
