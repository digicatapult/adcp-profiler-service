const {
  PROJECT_ID_RESPONSE,
  validateProjectByIdResponse,
} = require('../../../validators/getProjectByIdResponseValidator')

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

  return doc
}
