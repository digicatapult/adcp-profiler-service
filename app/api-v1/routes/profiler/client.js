const {
  POST_CLIENT_RESPONSES,
  validatePostClientResponse,
} = require('../../validators/client/postClientResponseValidator')

module.exports = function (apiService) {
  const doc = {
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

  doc.POST.apiDoc = {
    summary: 'POST client',
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