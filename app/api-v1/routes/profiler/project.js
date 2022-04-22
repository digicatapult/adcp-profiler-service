//Post new project
const { GET_PROJECTS_RESPONSES, validateGetProjectResponse } = require('../../validators/getProjectsResponse')

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
  }

  doc.GET.apiDoc = {
    summary: 'Get projects',
    responses: GET_PROJECTS_RESPONSES,
    tags: ['profiler'],
  }

  return doc
}
