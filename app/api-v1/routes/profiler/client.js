const {
  POST_CLIENT_RESPONSES,
  validatePostClientResponse,
} = require('../../validators/client/postClientResponseValidator')
const {
  GET_CLIENTS_RESPONSES,
  validateGetClientsResponse,
} = require('../../validators/client/getClientsResponseValidator')

module.exports = function (apiService) {
  const doc = {
    GET: async function (req, res) {
      const { statusCode, result } = await apiService.getClients()

      const validationErrors = validateGetClientsResponse(statusCode, result)

      if (validationErrors) {
        res.status(statusCode).json(validationErrors)
        return
      } else {
        res.status(statusCode).json(result)
        return
      }
    },
    POST: async function (req, res) {
      const { statusCode, result } = await apiService.postClient(req.body)

      const validationErrors = validatePostClientResponse(statusCode, result)

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
    summary: 'Retrieve clients',
    responses: GET_CLIENTS_RESPONSES,
    tags: ['clients'],
  }

  doc.POST.apiDoc = {
    summary: 'Create client',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/PostAndPutClient',
          },
        },
      },
    },
    responses: POST_CLIENT_RESPONSES,
    tags: ['clients'],
  }

  return doc
}
