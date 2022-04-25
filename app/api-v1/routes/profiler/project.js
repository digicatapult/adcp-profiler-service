//Post new project
const { GET_PROJECTS_RESPONSES, validateGetProjectResponse } = require('../../validators/getProjectsResponse')

const { POST_PROJECT_RESPONSES, validatePostProjectResponse } = require('../../validators/postProjectResponseValidator')

module.exports = function (apiService) {
  const doc = {
    GET: async function (req, res) {
      const result = await apiService.getProjects()

      const validationErrors = validateGetProjectResponse(400, result)

      if (validationErrors) {
        res.status(400).json(validationErrors)
        return
      } else {
        res.status(200).json(result)
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
    summary: 'GET projects',
    responses: GET_PROJECTS_RESPONSES,
    tags: ['profiler'],
  }

  doc.POST.apiDoc = {
    summary: 'POST project',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
            },
            required: ['name', 'description'],
          },
        },
      },
    },
    responses: POST_PROJECT_RESPONSES,
    tags: ['profiler'],
  }

  return doc
}
