const OpenAPIResponseValidator = require('openapi-response-validator').default

const apiDocResponses = require('../../api-doc-responses')
const apiDoc = require('../../api-doc')

const PUT_PROJECT_RESPONSES = {
  200: {
    description: 'Updated project',
    content: {
      'application/json': {
        schema: apiDoc.components.schemas.GetProject,
      },
    },
  },
  400: apiDocResponses['400'],
  404: apiDocResponses['404'],
  409: apiDocResponses['409'],
  default: apiDocResponses.default,
}

const validatePutProjectResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: PUT_PROJECT_RESPONSES })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  PUT_PROJECT_RESPONSES,
  validatePutProjectResponse,
}
