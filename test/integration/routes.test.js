const { describe, test, before } = require('mocha')
const { expect } = require('chai')

const { createHttpServer } = require('../../app/server')
const { getProjectsRoute, createProjectRoute } = require('../helper/routeHelper')
const { cleanup } = require('../helper/cleaner')

describe('routes', function () {
  describe('Project routes', function () {
    let app
    before(async function () {
      await cleanup()

      app = await createHttpServer()
    })

    after(async function () {})

    test('POST Project', async function () {
      const expectedResult = { name: 'item1', description: 'Test Item' }

      const res = await createProjectRoute(expectedResult, app)

      expect(res.status).to.equal(201)
      expect(res.body).deep.equal(expectedResult)
    })
  })
})
