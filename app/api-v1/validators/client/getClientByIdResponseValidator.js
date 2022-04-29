const { default: OpenAPIResponseValidator } = require('openapi-response-validator')

const apiDocResponses = require('../../api-doc-responses')
const apiDoc = require('../../api-doc')

const GET_CLIENT_BY_ID_RESPONSES = {
  200: {
    description: 'Retrieved client by id',
    content: {
      'application/json': {
        schema: apiDoc.components.schemas.GetClient,
      },
    },
  },
  404: apiDocResponses['404'],
  default: apiDocResponses.default,
}

const validateGetClientByIdResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: GET_CLIENT_BY_ID_RESPONSES })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  GET_CLIENT_BY_ID_RESPONSES,
  validateGetClientByIdResponse,
}
