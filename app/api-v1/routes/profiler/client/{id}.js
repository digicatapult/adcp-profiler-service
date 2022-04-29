const {
  validateGetClientByIdResponse,
  GET_CLIENT_BY_ID_RESPONSES,
} = require('../../../validators/client/getClientByIdResponseValidator')

module.exports = function (apiService) {
  const doc = {
    GET: async function (req, res) {
      const { id } = req.params
      const { statusCode, result } = await apiService.getClientById(id)

      const validationErrors = validateGetClientByIdResponse(statusCode, result)

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
    summary: 'Get client by id',
    parameters: [
      {
        description: 'Client id',
        in: 'path',
        required: true,
        name: 'id',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    responses: GET_CLIENT_BY_ID_RESPONSES,
    tags: ['clients'],
  }

  return doc
}
