const apiDocResponses = require('../../api-doc-responses')
const apiDoc = require('../../api-doc')

const GET_PROJECTS_RESPONSES = {
  200: {
    description: 'Get projects',
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

module.exports = {
  GET_PROJECTS_RESPONSES,
}
