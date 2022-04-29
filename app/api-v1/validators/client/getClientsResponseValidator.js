const apiDocResponses = require('../../api-doc-responses')
const apiDoc = require('../../api-doc')

const GET_CLIENTS_RESPONSES = {
  200: {
    description: 'GET clients',
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

module.exports = {
  GET_CLIENTS_RESPONSES,
}
