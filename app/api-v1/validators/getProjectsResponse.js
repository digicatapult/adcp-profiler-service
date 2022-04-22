const OpenAPIResponseValidator = require('openapi-response-validator').default

const apiDocResponses = require('../api-doc-responses')

const projectResponses = {
  200: {
    description: 'Returned Profiles',
    content: {
      'application/json': {},
    },
  },
  ...apiDocResponses,
}

const validateProjectResponses = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: projectResponses })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  projectResponses,
  validateProjectResponses,
}
