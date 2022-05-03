const { default: OpenAPIResponseValidator } = require('openapi-response-validator')

const apiDocResponses = require('../../api-doc-responses')
const apiDoc = require('../../api-doc')

const GET_CLIENTS_RESPONSES = {
  200: {
    description: 'Retrieved clients',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: apiDoc.components.schemas.GetClient,
        },
      },
    },
  },
  default: apiDocResponses.default,
}

const validateGetClientsResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: GET_CLIENTS_RESPONSES })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  GET_CLIENTS_RESPONSES,
  validateGetClientsResponse,
}
