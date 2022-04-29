const { default: OpenAPIResponseValidator } = require('openapi-response-validator')

const apiDocResponses = require('../../api-doc-responses')
const apiDoc = require('../../api-doc')

const GET_PROJECTS_RESPONSES = {
  200: {
    description: 'Retrieved projects',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: apiDoc.components.schemas.GetProject,
        },
      },
    },
  },
  default: apiDocResponses.default,
}

const validateGetProjectsResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: GET_PROJECTS_RESPONSES })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  GET_PROJECTS_RESPONSES,
  validateGetProjectsResponse,
}
