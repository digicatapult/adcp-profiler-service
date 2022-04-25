const OpenAPIResponseValidator = require('openapi-response-validator').default

const apiDocResponses = require('../api-doc-responses')
const apiDoc = require('../api-doc')

const PROJECT_NAME_RESPONSE = {
  200: {
    description: '',
    content: {
      'application/json': {
        schema: apiDoc.components.schemas.GetProjectByName,
      },
    },
  },
  400: apiDocResponses['400'],
  404: apiDocResponses['404'],
  default: apiDocResponses.default,
}

const validateProjectByNameResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: PROJECT_NAME_RESPONSE })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  PROJECT_NAME_RESPONSE,
  validateProjectByNameResponse,
}
