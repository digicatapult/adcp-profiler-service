const { default: OpenAPIResponseValidator } = require('openapi-response-validator')

const apiDocResponses = require('../../api-doc-responses')

const DELETE_PROJECT_RESPONSES = {
  204: {
    description: 'Deleted project',
  },
  404: apiDocResponses['404'],
  default: apiDocResponses.default,
}

const validateDeleteProjectResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: DELETE_PROJECT_RESPONSES })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  DELETE_PROJECT_RESPONSES,
  validateDeleteProjectResponse,
}
