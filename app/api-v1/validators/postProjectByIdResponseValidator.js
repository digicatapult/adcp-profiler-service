const OpenAPIResponseValidator = require('openapi-response-validator').default

const apiDocResponses = require('../api-doc-responses')
const apiDoc = require('../api-doc')

const POST_PROJECT_ID_RESPONSES = {
  201: {
    description: 'New Project Created',
    content: {
      'application/json': {
        schema: apiDoc.components.schemas.PostProjectWithID,
      },
    },
  },
  400: apiDocResponses['400'],
  409: apiDocResponses['409'],
  default: apiDocResponses.default,
}

const validatePostProjectWithIdResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: POST_PROJECT_ID_RESPONSES })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  POST_PROJECT_ID_RESPONSES,
  validatePostProjectWithIdResponse,
}
