const { default: OpenAPIResponseValidator } = require('openapi-response-validator')

const apiDocResponses = require('../../api-doc-responses')
const apiDoc = require('../../api-doc')

const POST_PROJECT_RESPONSES = {
  201: {
    description: 'Created project',
    content: {
      'application/json': {
        schema: apiDoc.components.schemas.GetProject,
      },
    },
  },
  400: apiDocResponses['400'],
  409: apiDocResponses['409'],
  default: apiDocResponses.default,
}

const validatePostProjectResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: POST_PROJECT_RESPONSES })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  POST_PROJECT_RESPONSES,
  validatePostProjectResponse,
}
