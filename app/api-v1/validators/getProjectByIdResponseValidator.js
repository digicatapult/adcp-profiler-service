const OpenAPIResponseValidator = require('openapi-response-validator').default

const apiDocResponses = require('../api-doc-responses')
const apiDoc = require('../api-doc')

const GET_PROJECT_BY_ID_RESPONSES = {
  200: {
    description: 'Get projects by id',
    content: {
      'application/json': {
        schema: apiDoc.components.schemas.GetProject,
      },
    },
  },
  404: apiDoc.components.responses['404'],
  default: apiDocResponses.default,
}

const validateGetProjectByIdResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: GET_PROJECT_BY_ID_RESPONSES })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  GET_PROJECT_BY_ID_RESPONSES,
  validateGetProjectByIdResponse,
}
