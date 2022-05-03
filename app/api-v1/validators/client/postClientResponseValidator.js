const { default: OpenAPIResponseValidator } = require('openapi-response-validator')

const apiDocResponses = require('../../api-doc-responses')
const apiDoc = require('../../api-doc')

const POST_CLIENT_RESPONSES = {
  201: {
    description: 'Created client',
    content: {
      'application/json': {
        schema: apiDoc.components.schemas.GetClient,
      },
    },
  },
  400: apiDocResponses['400'],
  default: apiDocResponses.default,
}

const validatePostClientResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: POST_CLIENT_RESPONSES })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  POST_CLIENT_RESPONSES,
  validatePostClientResponse,
}
