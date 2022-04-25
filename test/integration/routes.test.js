const { describe, test, before } = require('mocha')
const { expect } = require('chai')

const { assertUuidV4 } = require('../helper/appHelper')
const { createHttpServer } = require('../../app/server')
const { getProjectByIdRoute, getProjectsRoute, createProjectRoute } = require('../helper/routeHelper')
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
      const newProject = { name: 'item1', description: 'Test Item' }

      const res = await createProjectRoute(newProject, app)

      expect(res.status).to.equal(201)
      assertUuidV4(res.body.id)
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

    test('GET projects by id', async function () {
      const newProject = { name: 'item2', description: 'Test Item' }

      const tempRes = await createProjectRoute(newProject, app)

      const res = await getProjectByIdRoute(tempRes.body.id, app)

      expect(res.status).to.equal(200)
      assertUuidV4(res.body.id)
    })

    test.skip('GET projects by id - 404', async function () {
      const res = await getProjectByIdRoute('', app)
      expect(res.status).to.equal(404)
      //expect(res.body).deep.equal(expectedResult)
    })
  })
})
