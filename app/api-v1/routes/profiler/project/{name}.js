const {
  PROJECT_NAME_RESPONSE,
  validateProjectByNameResponse,
} = require('../../../validators/getProjectByNameResponseValidator')

module.exports = function (apiService) {
  const doc = {
    GET: async function (req, res) {
      const { name } = req.params
      const { statusCode, result } = await apiService.getProjectByName(name)

      const validationErrors = validateProjectByNameResponse(statusCode, result)

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
    summary: 'GET project by namee',
    parameters: [
      {
        description: 'Project namee',
        in: 'path',
        required: true,
        name: 'name',
        allowEmptyValue: false,
      },
    ],
    responses: PROJECT_NAME_RESPONSE,
    tags: ['profiler'],
  }

  return doc
}
