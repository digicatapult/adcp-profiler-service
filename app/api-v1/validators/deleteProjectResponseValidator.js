const OpenAPIResponseValidator = require('openapi-response-validator').default

const apiDocResponses = require('../api-doc-responses')
const apiDoc = require('../api-doc')

const DELETE_PROJECT_RESPONSES = {
  201: {
    description: '',
    content: {
      'application/json': {
        schema: apiDoc.components.schemas.GetProject,
      },
    },
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
