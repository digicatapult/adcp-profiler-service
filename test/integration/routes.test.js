const { describe, test, before } = require('mocha')
const { expect } = require('chai')

const { createHttpServer } = require('../../app/server')
const { getProjectByNameRoute, getProjectsRoute, createProjectRoute } = require('../helper/routeHelper')
const { cleanup } = require('../helper/seeds/project')

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

    test('GET projects', async function () {
      const expectedResult = [
        {
          name: 'item1',
          description: 'Test Item',
        },
      ]

      const res = await getProjectsRoute(app)

      expect(res.status).to.equal(200)
      expect(res.body).deep.equal(expectedResult)
    })

    test.skip('GET projects by name', async function () {
      const expectedResult = 'item2'

      const seed = { name: 'item2', description: 'Test Item2' }

      await createProjectRoute(seed, app)

      const res = await getProjectByNameRoute('item2', app)

      expect(res.status).to.equal(200)
      expect(res.body).deep.equal(expectedResult)
    })

    test.skip('GET projects by name - 404', async function () {
      const expectedResult = {}

      const res = await getProjectByNameRoute(expectedResult, app)

      expect(res.status).to.equal(404)
      expect(res.body).deep.equal(expectedResult)
    })
  })
})
