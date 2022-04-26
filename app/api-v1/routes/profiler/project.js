const { GET_PROJECTS_RESPONSES } = require('../../validators/getProjectsResponseValidator')

const { POST_PROJECT_RESPONSES, validatePostProjectResponse } = require('../../validators/postProjectResponseValidator')

module.exports = function (apiService) {
  const doc = {
    GET: async function (req, res) {
      const { statusCode, result } = await apiService.getProjects()

      res.status(statusCode).json(result)
      return
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
    summary: 'GET projects',
    responses: GET_PROJECTS_RESPONSES,
    tags: ['projects'],
  }

  doc.POST.apiDoc = {
    summary: 'POST project',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/PostProject',
          },
        },
      },
    },
    responses: POST_PROJECT_RESPONSES,
    tags: ['projects'],
  }

  return doc
}
