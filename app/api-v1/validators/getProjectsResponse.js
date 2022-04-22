const OpenAPIResponseValidator = require('openapi-response-validator').default

const apiDocResponses = require('../api-doc-responses')

const GET_PROJECTS_RESPONSES = {
  200: {
    description: 'Returned projects',
    content: {
      'application/json': {},
    },
  },
  default: apiDocResponses.default,
}

const validateGetProjectResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: GET_PROJECTS_RESPONSES })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  GET_PROJECTS_RESPONSES,
  validateGetProjectResponse,
}
