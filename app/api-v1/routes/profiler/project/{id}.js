const {
  PROJECT_ID_RESPONSE,
  validateProjectByIdResponse,
} = require('../../../validators/getProjectByIdResponseValidator')

const {
  PUT_PROJECT_RESPONSES,
  validatePutProjectResponse,
} = require('../../../validators/putProjectByIdResponseValidator')

const {
  DELETE_ID_RESPONSE,
  validateDeleteProjectByIdResponse,
} = require('../../../validators/deleteProjectByIdResponseValidator')

module.exports = function (apiService) {
  const doc = {
    GET: async function (req, res) {
      const { id } = req.params

      const { statusCode, result } = await apiService.getProjectById(id)

      const validationErrors = validateProjectByIdResponse(statusCode, result)

      if (validationErrors) {
        res.status(statusCode).json(validationErrors)
        return
      } else {
        res.status(statusCode).json(result)
        return
      }
    },
    PUT: async function (req, res) {
      const { id } = req.params
      const { statusCode, result } = await apiService.putProject(id, req.body)

      const validationErrors = validatePutProjectResponse(statusCode, result)

      if (validationErrors) {
        res.status(statusCode).json(validationErrors)
        return
      } else {
        res.status(statusCode).json(result)
        return
      }
    },
    DELETE: async function (req, res) {
      const { id } = req.params
      const { statusCode, result } = await apiService.deleteProjectById(id)

      const validationErrors = validateDeleteProjectByIdResponse(statusCode, result)

      if (validationErrors) {
        res.status(statusCode).json(validationErrors)
        return
      } else {
        res.status(statusCode).json(result)
        return
      }
    },
  }

  doc.GET.apiDoc = {
    summary: 'GET project by id',
    parameters: [
      {
        description: 'Project id',
        in: 'path',
        required: true,
        name: 'id',
        allowEmptyValue: false,
      },
    ],
    responses: PROJECT_ID_RESPONSE,
    tags: ['projects'],
  }

  doc.PUT.apiDoc = {
    summary: 'Update project',
    parameters: [
      {
        description: 'ID of the project',
        in: 'path',
        required: true,
        name: 'id',
        allowEmptyValue: false,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
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
              documentsPath: {
                description: 'Project documents path',
                type: 'string',
                nullable: true,
              },
            },
            required: ['clientId', 'name', 'description'],
          },
        },
      },
    },
    responses: PUT_PROJECT_RESPONSES,
    tags: ['projects'],
  }

  doc.DELETE.apiDoc = {
    summary: 'DELETE project by id',
    parameters: [
      {
        description: 'Project id',
        in: 'path',
        required: true,
        name: 'id',
        allowEmptyValue: false,
      },
    ],
    responses: DELETE_ID_RESPONSE,
    tags: ['projects'],
  }

  return doc
}
