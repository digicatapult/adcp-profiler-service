const {
  validateGetClientByIdResponse,
  GET_CLIENT_BY_ID_RESPONSES,
} = require('../../../validators/client/getClientByIdResponseValidator')
const {
  PUT_CLIENT_RESPONSES,
  validatePutClientResponse,
} = require('../../../validators/client/putClientResponseValidator')

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
    PUT: async function (req, res) {
      const { id } = req.params
      const { statusCode, result } = await apiService.putClient(id, req.body)

      const validationErrors = validatePutClientResponse(statusCode, result)

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

  doc.PUT.apiDoc = {
    summary: 'Put client',
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
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/PostAndPutClient',
          },
        },
      },
    },
    responses: PUT_CLIENT_RESPONSES,
    tags: ['clients'],
  }

  return doc
}
