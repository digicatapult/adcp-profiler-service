const { default: OpenAPIResponseValidator } = require('openapi-response-validator')

const apiDocResponses = require('../../api-doc-responses')

const DELETE_CLIENT_RESPONSES = {
  204: {
    description: 'Deleted client',
  },
  404: apiDocResponses['404'],
  default: apiDocResponses.default,
}

const validateDeleteClientResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: DELETE_CLIENT_RESPONSES })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  DELETE_CLIENT_RESPONSES,
  validateDeleteClientResponse,
}
