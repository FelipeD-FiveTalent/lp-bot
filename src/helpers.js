module.exports.createResponse = (statusCode, message) => ({
  statusCode,
  body: JSON.stringify(message, null, 2),
  isBase64Encoded: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
});

module.exports.getCustomFieldValues = branch => {
  if (branch === 'master') {
    return { Status: 'Passed - Code Review', Environment: 'Development' };
  }
  if (branch === 'testing') {
    return { Status: 'QA', Environment: 'Testing' };
  }
  if (branch === 'staging') {
    return { Status: 'CAT', Environment: 'Staging' };
  }
  if (branch === 'production') {
    return { Status: 'Production', Environment: 'Production' };
  }
};

module.exports.getTaskId = commit => {
  const match5OrMoreDigits = /[0-9]{5,}/; // Prevents making request for merge #'s ie "Merge pull request #12...""
  const taskId = commit.message.match(match5OrMoreDigits);

  if (taskId) {
    return taskId[0];
  }

  return null;
};
