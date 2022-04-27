const OpenAPIResponseValidator = require('openapi-response-validator').default

const apiDocResponses = require('../api-doc-responses')
const apiDoc = require('../api-doc')

const DELETE_ID_RESPONSE = {
  201: {
    description: '',
    content: {
      'application/json': {
        schema: apiDoc.components.schemas.GetProjectById,
      },
    },
  },
  400: apiDocResponses['400'],
  404: apiDocResponses['404'],
  default: apiDocResponses.default,
}

const validateDeleteProjectByIdResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: DELETE_ID_RESPONSE })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  DELETE_ID_RESPONSE,
  validateDeleteProjectByIdResponse,
}
