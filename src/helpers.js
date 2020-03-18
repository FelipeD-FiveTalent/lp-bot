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
    return { Status: 'Passed - QA', Environment: 'Staging' };
  }
  if (branch === 'production') {
    return { Status: 'Production', Environment: 'Production' };
  }
};
