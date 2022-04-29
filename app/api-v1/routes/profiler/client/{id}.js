const {
  validateGetClientByIdResponse,
  GET_CLIENT_BY_ID_RESPONSES,
} = require('../../../validators/client/getClientByIdResponseValidator')
const {
  PUT_CLIENT_RESPONSES,
  validatePutClientResponse,
} = require('../../../validators/client/putClientResponseValidator')
const {
  validateDeleteClientResponse,
  DELETE_CLIENT_RESPONSES,
} = require('../../../validators/client/deleteClientResponseValidator')

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
    DELETE: async function (req, res) {
      const { id } = req.params
      const { statusCode, result } = await apiService.deleteClient(id)

      const validationErrors = validateDeleteClientResponse(statusCode, result)

      if (validationErrors) {
        res.status(statusCode).json(result)
        return
      } else {
        res.status(statusCode).send()
      }
    },
  }

  doc.GET.apiDoc = {
    summary: 'Retrieve client by id',
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
    summary: 'Update client',
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

  doc.DELETE.apiDoc = {
    summary: 'Remove client',
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
    responses: DELETE_CLIENT_RESPONSES,
    tags: ['clients'],
  }

  return doc
}
