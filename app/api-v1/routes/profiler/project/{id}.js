const {
  validateGetProjectByIdResponse,
  GET_PROJECT_BY_ID_RESPONSES,
} = require('../../../validators/project/getProjectByIdResponseValidator')
const {
  PUT_PROJECT_RESPONSES,
  validatePutProjectResponse,
} = require('../../../validators/project/putProjectResponseValidator')
const {
  DELETE_PROJECT_RESPONSES,
  validateDeleteProjectResponse,
} = require('../../../validators/project/deleteProjectResponseValidator')

module.exports = function (apiService) {
  const doc = {
    GET: async function (req, res) {
      const { id } = req.params
      const { statusCode, result } = await apiService.getProjectById(id)

      const validationErrors = validateGetProjectByIdResponse(statusCode, result)

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
      const { statusCode, result } = await apiService.deleteProject(id)

      const validationErrors = validateDeleteProjectResponse(statusCode, result)

      if (validationErrors) {
        res.status(statusCode).json(validationErrors)
        return
      } else {
        res.status(statusCode).send()
        return
      }
    },
  }

  doc.GET.apiDoc = {
    summary: 'Retrieve project by id',
    parameters: [
      {
        description: 'Id of the project',
        in: 'path',
        required: true,
        name: 'id',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    responses: GET_PROJECT_BY_ID_RESPONSES,
    tags: ['projects'],
  }

  doc.PUT.apiDoc = {
    summary: 'Update project',
    parameters: [
      {
        description: 'Id of the project',
        in: 'path',
        required: true,
        name: 'id',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            oneOf: [
              { $ref: '#/components/schemas/PostAndPutProjectWithClientId' },
              { $ref: '#/components/schemas/PostAndPutProjectWithClient' },
            ],
          },
        },
      },
    },
    responses: PUT_PROJECT_RESPONSES,
    tags: ['projects'],
  }

  doc.DELETE.apiDoc = {
    summary: 'Remove project',
    parameters: [
      {
        description: 'Id of the project',
        in: 'path',
        required: true,
        name: 'id',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    responses: DELETE_PROJECT_RESPONSES,
    tags: ['projects'],
  }

  return doc
}
