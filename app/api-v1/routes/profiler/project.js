const {
  GET_PROJECTS_RESPONSES,
  validateGetProjectsResponse,
} = require('../../validators/project/getProjectsResponseValidator')
const {
  POST_PROJECT_RESPONSES,
  validatePostProjectResponse,
} = require('../../validators/project/postProjectResponseValidator')

module.exports = function (apiService) {
  const doc = {
    GET: async function (req, res) {
      const { statusCode, result } = await apiService.getProjects()

      const validationErrors = validateGetProjectsResponse(statusCode, result)

      if (validationErrors) {
        res.status(statusCode).json(validationErrors)
        return
      } else {
        res.status(statusCode).json(result)
        return
      }
    },
    POST: async function (req, res) {
      const { statusCode, result } = await apiService.postProject(req.body)

      const validationErrors = validatePostProjectResponse(statusCode, result)

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
    summary: 'Retrieve projects',
    responses: GET_PROJECTS_RESPONSES,
    tags: ['projects'],
  }

  doc.POST.apiDoc = {
    summary: 'Create project',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/PostAndPutProject',
          },
        },
      },
    },
    responses: POST_PROJECT_RESPONSES,
    tags: ['projects'],
  }

  return doc
}
