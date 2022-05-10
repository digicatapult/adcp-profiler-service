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
      GetClient: {
        description: 'Schema for retrieving a client',
        type: 'object',
        properties: {
          id: {
            description: 'Id of the client',
            type: 'string',
            format: 'uuid',
          },
          firstName: {
            description: 'First name of the client',
            type: 'string',
          },
          lastName: {
            description: 'Last name of the client',
            type: 'string',
          },
          company: {
            description: 'Company of the client',
            type: 'string',
          },
          role: {
            description: 'Role of the client',
            type: 'string',
          },
        },
        required: ['id', 'firstName', 'lastName', 'company', 'role'],
      },
      PostAndPutClient: {
        description: 'Schema for creating/updating a client',
        type: 'object',
        properties: {
          firstName: {
            description: 'First name of the client',
            type: 'string',
          },
          lastName: {
            description: 'Last name of the client',
            type: 'string',
          },
          company: {
            description: 'Company of the client',
            type: 'string',
          },
          role: {
            description: 'Role of the client',
            type: 'string',
          },
        },
        required: ['firstName', 'lastName', 'company', 'role'],
      },
      GetProject: {
        description: 'Schema for retrieving a project',
        type: 'object',
        properties: {
          id: {
            description: 'Id of the project',
            type: 'string',
            format: 'uuid',
          },
          clientId: {
            description: 'Client id of the project',
            type: 'string',
            format: 'uuid',
          },
          name: {
            description: 'Name of the project',
            type: 'string',
          },
          description: {
            description: 'Description of the project',
            type: 'string',
          },
          startDate: {
            description: 'Start date of the project',
            type: 'object',
            format: 'js-date',
            nullable: true,
          },
          endDate: {
            description: 'End date of the project',
            type: 'object',
            format: 'js-date',
            nullable: true,
          },
          budget: {
            description: 'Budget of the project',
            type: 'number',
            nullable: true,
          },
          documentUrl: {
            description: 'Document url of the project',
            type: 'string',
            nullable: true,
          },
        },
        required: ['id', 'clientId', 'name', 'description'],
      },
      PostAndPutProjectWithClientId: {
        description: 'Schema for creating/updating a project',
        type: 'object',
        properties: {
          clientId: {
            description: 'Client id of the project',
            type: 'string',
            format: 'uuid',
          },
          name: {
            description: 'Name of the project',
            type: 'string',
          },
          description: {
            description: 'Description of the project',
            type: 'string',
          },
          startDate: {
            description: 'Start date of the project',
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          endDate: {
            description: 'End date of the project',
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          budget: {
            description: 'Budget of the project',
            type: 'number',
            nullable: true,
          },
          documentUrl: {
            description: 'Document url of the project',
            type: 'string',
            nullable: true,
          },
        },
        required: ['clientId', 'name', 'description'],
      },
      PostProjectWithClient: {
        description: 'Schema for creating/updating a project',
        type: 'object',
        properties: {
          firstName: {
            description: 'First name of the client',
            type: 'string',
          },
          lastName: {
            description: 'Last name of the client',
            type: 'string',
          },
          company: {
            description: 'Company of the client',
            type: 'string',
          },
          role: {
            description: 'Role of the client',
            type: 'string',
          },
          name: {
            description: 'Name of the project',
            type: 'string',
          },
          description: {
            description: 'Description of the project',
            type: 'string',
          },
          startDate: {
            description: 'Start date of the project',
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          endDate: {
            description: 'End date of the project',
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          budget: {
            description: 'Budget of the project',
            type: 'number',
            nullable: true,
          },
          documentUrl: {
            description: 'Document url of the project',
            type: 'string',
            nullable: true,
          },
        },
        required: ['firstName', 'lastName', 'company', 'role', 'name', 'description'],
      },
    },
  },
  paths: {},
}

module.exports = apiDoc
