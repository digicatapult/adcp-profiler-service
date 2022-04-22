//Get Projects
//Post new project
const { projectResponses, validateProjectResponses } = require('../../validators/getProjectsResponse')

module.exports = function (apiService) {
  const doc = {
    GET: async function (req, res) {
      const result = await apiService.getProfiles()

      const validationErrors = validateProjectResponses(400, result)

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
    summary: 'Get my profiles',
    responses: projectResponses,
    security: [],
    tags: ['profiler'],
  }
}
