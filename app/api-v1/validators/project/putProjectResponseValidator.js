const OpenAPIResponseValidator = require('openapi-response-validator').default

const apiDocResponses = require('../../api-doc-responses')
const apiDoc = require('../../api-doc')

const PUT_PROJECT_RESPONSES = {
  200: {
    description: 'Update Project',
    content: {
      'application/json': {
        schema: apiDoc.components.schemas.GetProject,
      },
    },
  },
  400: apiDoc.components.responses['400'],
  404: apiDoc.components.responses['404'],
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
