module.exports.createResponse = (statusCode, message) => ({
  statusCode,
  body: JSON.stringify(message, null, 2),
  isBase64Encoded: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
});
