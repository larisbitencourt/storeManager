
const httpErrorMap = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_DATA: 422,
};

const statusHTTP = (status) => httpErrorMap[status] || 500;

module.exports = statusHTTP;