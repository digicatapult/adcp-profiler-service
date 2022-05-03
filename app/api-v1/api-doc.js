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
        description: 'GET project',
        type: 'object',
        properties: {
          id: {
            description: 'Project id',
            type: 'string',
            format: 'uuid',
          },
          clientId: {
            description: 'Project client id',
            type: 'string',
            format: 'uuid',
          },
          name: {
            description: 'Project Name',
            type: 'string',
          },
          description: {
            description: 'Project Description',
            type: 'string',
          },
          startDate: {
            description: 'Project start date',
            type: 'object',
            format: 'startDate',
            nullable: true,
          },
          endDate: {
            description: 'Project end date',
            type: 'object',
            format: 'endDate',
            nullable: true,
          },
          budget: {
            description: 'Project budget',
            type: 'number',
            nullable: true,
          },
          documentUrl: {
            description: 'Project document url',
            type: 'string',
            nullable: true,
          },
        },
        required: ['id', 'clientId', 'name', 'description'],
      },
      PostAndPutProject: {
        description: 'POST/PUT project',
        type: 'object',
        properties: {
          clientId: {
            description: 'Project client id',
            type: 'string',
            format: 'uuid',
          },
          name: {
            description: 'Project Name',
            type: 'string',
          },
          description: {
            description: 'Project Description',
            type: 'string',
          },
          startDate: {
            description: 'Project start date',
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          endDate: {
            description: 'Project end date',
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          budget: {
            description: 'Project budget',
            type: 'number',
            nullable: true,
          },
          documentUrl: {
            description: 'Project document url',
            type: 'string',
            nullable: true,
          },
        },
        required: ['clientId', 'name', 'description'],
      },
    },
  },
  paths: {},
}

module.exports = apiDoc
