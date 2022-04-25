const { describe, test, before } = require('mocha')
const { expect } = require('chai')

const { createHttpServer } = require('../../app/server')
const { createProjectRoute } = require('../helper/routeHelper')
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

    test('POST invalid project', async function () {
      const expectedResult = {}

      const res = await createProjectRoute(expectedResult, app)

      expect(res.status).to.equal(400)
      expect(res.body).deep.equal(expectedResult)
    })

    test('POST duplicate project', async function () {
      const thing = { name: 'item1', description: 'Test Item' }

      const res = await createProjectRoute(thing, app)

      expect(res.status).to.equal(409)
      expect(res.body).deep.equal({})
    })
  })
})
