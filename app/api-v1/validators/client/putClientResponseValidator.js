const apiDocResponses = require('../../api-doc-responses')
const apiDoc = require('../../api-doc')
const { default: OpenAPIResponseValidator } = require('openapi-response-validator')

const PUT_CLIENT_RESPONSES = {
  200: {
    description: 'Updated client',
    content: {
      'application/json': {
        schema: apiDoc.components.schemas.GetClient,
      },
    },
  },
  404: apiDocResponses['404'],
  default: apiDocResponses.default,
}

const validatePutClientResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: PUT_CLIENT_RESPONSES })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  PUT_CLIENT_RESPONSES,
  validatePutClientResponse,
}
