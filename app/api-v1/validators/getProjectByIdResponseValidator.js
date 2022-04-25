const OpenAPIResponseValidator = require('openapi-response-validator').default

const apiDocResponses = require('../api-doc-responses')
const apiDoc = require('../api-doc')

const PROJECT_ID_RESPONSE = {
  200: {
    description: '',
    content: {
      'application/json': {
        schema: apiDoc.components.schemas.GetProjectById,
      },
    },
  },
  default: apiDocResponses.default,
}

const validateProjectByIdResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: PROJECT_ID_RESPONSE })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  PROJECT_ID_RESPONSE,
  validateProjectByIdResponse,
}
