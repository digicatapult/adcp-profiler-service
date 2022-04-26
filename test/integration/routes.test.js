const { describe, test, before } = require('mocha')
const { expect } = require('chai')

const {
  assertUuidV4,
  assertPostProjectParams,
  assertPostProjectRequiredParams,
  assertGetProjects,
} = require('../helper/appHelper')
const { createHttpServer } = require('../../app/server')
const { getProjectByIdRoute, getProjectsRoute, createProjectRoute } = require('../helper/routeHelper')
const { seed } = require('../helper/seeds/project')

describe('routes', function () {
  describe('Project routes', function () {
    let app
    let clientId

    before(async function () {
      //await cleanup()
      await seed()

      app = await createHttpServer()
      clientId = 'c7b9e848-e2bb-456d-8eaa-129c1cb3580c'
    })

    after(async function () {})

    test('POST Project with only required fields', async function () {
      const newProject = {
        clientId,
        name: 'item1',
        description: 'Test Item',
      }

      const response = await createProjectRoute(newProject, app)

      expect(response.status).to.equal(201)
      assertPostProjectRequiredParams(response.body, newProject)
    })

    test('POST Project with all fields', async function () {
      const newProject = {
        clientId,
        name: 'item2',
        description: 'Test Item',
        startDate: null,
        endDate: null,
        budget: null,
        documentsPath: null,
      }

      const response = await createProjectRoute(newProject, app)

      expect(response.status).to.equal(201)
      assertPostProjectParams(response.body, newProject)
    })

    test('GET projects', async function () {
      const expectedResult = [
        {
          clientId,
          name: 'item2',
          description: 'Test Item',
          startDate: null,
          endDate: null,
          budget: null,
          documentsPath: null,
        },
      ]

      const response = await getProjectsRoute(app)

      expect(response.status).to.equal(200)

      assertGetProjects(response.body, expectedResult)
    })

    test('POST Project missing client ID', async function () {
      const newProject = {
        name: 'item1',
        description: 'Test Item',
      }

      const response = await createProjectRoute(newProject, app)

      expect(response.status).to.equal(400)
      expect(response.body).deep.equal({})
    })

    test('POST invalid project', async function () {
      const expectedResult = {}

      const response = await createProjectRoute(expectedResult, app)

      expect(response.status).to.equal(400)
      expect(response.body).deep.equal(expectedResult)
    })

    test('POST duplicate project', async function () {
      const thing = {
        name: 'item1',
        description: 'Test Item',
        startDate: null,
        endDate: null,
        budget: null,
        documentsPath: null,
      }

      const response = await createProjectRoute(thing, app)

      expect(response.status).to.equal(409)
      expect(response.body).deep.equal({})
    })

    test.skip('GET projects by id', async function () {
      const newProject = { name: 'item2', description: 'Test Item' }

      const tempRes = await createProjectRoute(newProject, app)

      const response = await getProjectByIdRoute(tempRes.body.id, app)

      expect(response.status).to.equal(200)
      assertUuidV4(response.body.id)
    })
  })
})
