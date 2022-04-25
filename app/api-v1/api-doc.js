const { PORT, API_VERSION, API_MAJOR_VERSION } = require('../env')

const apiDoc = {
  openapi: '3.0.3',
  info: {
    title: 'ApiService',
    version: API_VERSION,
  },
  servers: [
    {
      url: `http://localhost:${PORT}/${API_MAJOR_VERSION}`,
    },
  ],
  components: {
    responses: {
      NotFoundError: {
        description: 'This resource cannot be found',
      },
      BadRequestError: {
        description: 'The request is invalid',
      },
      ConflictError: {
        description: 'This resource already exists',
      },
      UnauthorizedError: {
        description: 'Access token is missing or invalid',
      },
      Error: {
        description: 'An error occurred',
      },
    },
    schemas: {
      PostProject: {
        description: 'POST project',
        type: 'object',
        properties: {
          name: {
            description: 'Project Name',
            type: 'string',
          },
          description: {
            description: 'Project Description',
            type: 'string',
          },
        },
        required: ['name', 'description'],
      },

      PostProjectWithID: {
        description: 'POST project with ID',
        type: 'object',
        properties: {
          id: {
            description: 'Prroject ID',
            type: 'string',
          },
          name: {
            description: 'Project Name',
            type: 'string',
          },
          description: {
            description: 'Project Description',
            type: 'string',
          },
        },
        required: ['id', 'name', 'description'],
      },

      GetProjectByName: {
        description: 'GET project by name',
        type: 'object',
        properties: {
          name: {
            description: 'Project Name',
            type: 'string',
          },
        },
        required: ['name'],
      },
    },
  },
  paths: {},
}

module.exports = apiDoc
