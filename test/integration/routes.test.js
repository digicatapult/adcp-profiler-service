const { describe, test, before } = require('mocha')
const { expect } = require('chai')

const {
  assertUuidV4,
  assertPostProjectParams,
  assertPostProjectRequiredParams,
  assertGetProjects,
} = require('../helper/appHelper')
const { createHttpServer } = require('../../app/server')
const {
  getProjectByIdRoute,
  getProjectsRoute,
  createProjectRoute,
  putProjectRoute,
  deleteProjectByIdRoute,
} = require('../helper/routeHelper')
const { seed } = require('../helper/seeds/project')

describe('routes', function () {
  describe('Project routes', function () {
    let app
    let clientId
    let fakeId

    before(async function () {
      //await cleanup()
      await seed()

      app = await createHttpServer()
      clientId = 'c7b9e848-e2bb-456d-8eaa-129c1cb3580c'
      fakeId = '9c9c9c9d-99c9-999d-9ea9-9999d99b99fc'
    })

    after(async function () {})

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
      const postedProjects = await getProjectsRoute(app)

      const response = await createProjectRoute(postedProjects.body[0], app)

      expect(response.status).to.equal(409)
      expect(response.body).deep.equal({})
    })

    test('GET projects by id', async function () {
      const newProject = { clientId, name: 'Get By Id', description: 'Test Item' }

      const tempResponse = await createProjectRoute(newProject, app)

      const response = await getProjectByIdRoute(tempResponse.body.id, app)

      expect(response.status).to.equal(200)
      assertUuidV4(response.body.id)
      assertPostProjectRequiredParams(response.body, tempResponse.body)
    })

    test('PUT project', async function () {
      const newProject = { clientId, name: 'PUT item', description: 'Test PUT Item' }

      const firstResponse = await createProjectRoute(newProject, app)

      expect(firstResponse.body.name).to.equal('PUT item')

      const updatedProject = {
        clientId,
        name: 'PUT item updated',
        description: firstResponse.body.description,
        startDate: new Date().toISOString(),
        budget: 30000,
      }
      const response = await putProjectRoute(firstResponse.body.id, updatedProject, app)

      expect(response.status).to.equal(200)
      expect(response.body[0].name).to.equal('PUT item updated')
    })

    test('PUT project with incorrect id', async function () {
      const newProject = { clientId, name: 'PUT item', description: 'Test PUT Item' }

      const response = await putProjectRoute(fakeId, newProject, app)

      expect(response.status).to.equal(404)
      expect(response.body).deep.equal({})
    })

    test('PUT project with missing required client ID parameter', async function () {
      const newProject = { clientId, name: 'PUT item', description: 'Test PUT Item' }

      const firstResponse = await createProjectRoute(newProject, app)

      expect(firstResponse.body.name).to.equal('PUT item')

      const updatedProject = {
        name: 'PUT item missing Client ID',
        description: firstResponse.body.description,
        startDate: new Date().toISOString(),
        budget: 30000,
      }
      const response = await putProjectRoute(firstResponse.body.id, updatedProject, app)

      expect(response.status).to.equal(400)
      expect(response.body).deep.equal({})
    })

    test('DELETE project by id', async function () {
      const newProject = { clientId, name: 'DELETE project', description: 'Test Item' }

      const tempResponse = await createProjectRoute(newProject, app)

      const response = await deleteProjectByIdRoute(tempResponse.body.id, app)

      expect(response.status).to.equal(204)
    })

    test('DELETE project with non-existant id', async function () {
      const response = await deleteProjectByIdRoute(fakeId, app)

      expect(response.status).to.equal(404)
    })
  })
})
