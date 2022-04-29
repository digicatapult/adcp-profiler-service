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
      const { statusCode, result } = await apiService.deleteProjectById(id)

      const validationErrors = validateDeleteProjectResponse(statusCode, result)

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
    summary: 'Get project by id',
    parameters: [
      {
        description: 'Project id',
        in: 'path',
        required: true,
        name: 'id',
        allowEmptyValue: false,
      },
    ],
    responses: GET_PROJECT_BY_ID_RESPONSES,
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
            $ref: '#/components/schemas/PostAndPutProject',
          },
        },
      },
    },
    responses: PUT_PROJECT_RESPONSES,
    tags: ['projects'],
  }

  doc.DELETE.apiDoc = {
    summary: 'Delete project',
    parameters: [
      {
        description: 'Project id',
        in: 'path',
        required: true,
        name: 'id',
        allowEmptyValue: false,
      },
    ],
    responses: DELETE_PROJECT_RESPONSES,
    tags: ['projects'],
  }

  return doc
}
