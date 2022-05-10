const { describe, test, before } = require('mocha')
const { expect } = require('chai')
const moment = require('moment')

const {
  createDefaultProject,
  createProject,
  assertPostProjectParams,
  assertPostProjectRequiredParams,
  assertGetProjects,
  createDefaultProjectWithClient,
  createDefaultClient,
  assertPostProjectWithUnknownClientIdParams,
} = require('../helper/appHelper')
const { createHttpServer } = require('../../app/server')
const {
  getProjectByIdRoute,
  getProjectsRoute,
  postProjectRoute,
  putProjectRoute,
  deleteProjectRoute,
} = require('../helper/projectRouteHelper')
const { seed, cleanup, cleanupAll } = require('../seeds/project')

describe('Project routes', function () {
  let app
  let clientId
  let invalidId
  let defaultProjectWithClientId
  let defaultProject
  let defaultClient
  let defaultProjectWithClient

  before(async function () {
    app = await createHttpServer()
    clientId = 'c7b9e848-e2bb-456d-8eaa-129c1cb3580c'
    invalidId = '00000000-0000-0000-0000-000000000000'
    defaultProjectWithClientId = createDefaultProject({ clientId })
    defaultClient = createDefaultClient()
    defaultProject = createDefaultProject({})
    defaultProjectWithClient = createDefaultProjectWithClient(defaultProject, defaultClient)
  })

  describe('Project with client id', function () {
    before(async function () {
      await seed()
    })

    beforeEach(async function () {
      await cleanup('projects')
    })

    test('POST Project with client id - all request body parameters', async function () {
      const expectedResult = defaultProjectWithClientId

      const actualResponse = await postProjectRoute(defaultProjectWithClientId, app)

      expect(actualResponse.status).to.equal(201)
      assertPostProjectParams(actualResponse.body, expectedResult)
    })

    test('POST Project with client id - only required request body parameters', async function () {
      const project = createProject({ clientId, name: 'Project 1', description: 'Project 1 description' })

      const expectedResult = {
        ...project,
        startDate: null,
        endDate: null,
        budget: null,
        documentUrl: null,
      }

      const actualResponse = await postProjectRoute(project, app)

      expect(actualResponse.status).to.equal(201)
      assertPostProjectRequiredParams(actualResponse.body, expectedResult)
    })

    test('POST Project with client id - missing client id', async function () {
      const invalidProject = createProject({ name: 'Project 1', description: 'Project 1 description' })

      const actualResponse = await postProjectRoute(invalidProject, app)

      expect(actualResponse.status).to.equal(400)
      expect(actualResponse.body).deep.equal({})
    })

    test('POST Project with client id - invalid project', async function () {
      const actualResponse = await postProjectRoute({}, app)

      expect(actualResponse.status).to.equal(400)
      expect(actualResponse.body).deep.equal({})
    })

    test('POST with client id - duplicate project', async function () {
      await postProjectRoute(defaultProjectWithClientId, app)
      const actualResponse = await postProjectRoute(defaultProjectWithClientId, app)

      expect(actualResponse.status).to.equal(409)
      expect(actualResponse.body).deep.equal({})
    })

    test('GET projects', async function () {
      const expectedResult = [defaultProjectWithClientId]

      await postProjectRoute(defaultProjectWithClientId, app)
      const actualResponse = await getProjectsRoute(app)

      expect(actualResponse.status).to.equal(200)
      assertGetProjects(actualResponse.body, expectedResult)
    })

    test('GET project by id', async function () {
      const expectedResult = defaultProjectWithClientId

      const response = await postProjectRoute(defaultProjectWithClientId, app)
      const actualResponse = await getProjectByIdRoute(response.body.id, app)

      expect(actualResponse.status).to.equal(200)
      assertPostProjectRequiredParams(actualResponse.body, expectedResult)
    })

    test('GET project by id with invalid path id parameter', async function () {
      const actualResponse = await getProjectByIdRoute('123', app)

      expect(actualResponse.status).to.equal(400)
    })

    test('GET project by id with non-existing project', async function () {
      const actualResponse = await getProjectByIdRoute(invalidId, app)

      expect(actualResponse.status).to.equal(404)
    })

    test('PUT project with all request body parameters', async function () {
      const updatedProject = createProject({
        clientId,
        name: 'Project 2',
        description: 'Project 2 description',
        startDate: moment().startOf('day').toISOString(),
        endDate: moment().endOf('day').toISOString(),
        budget: 200000.0,
        documentUrl: 'http://digitalcatapult.org.uk/document/url',
      })
      const expectedResult = updatedProject

      const response = await postProjectRoute(defaultProjectWithClientId, app)
      const actualResponse = await putProjectRoute(response.body.id, updatedProject, app)

      expect(actualResponse.status).to.equal(200)
      assertPostProjectParams(actualResponse.body, expectedResult)
    })

    test('PUT project with only required fields', async function () {
      const project = createProject({ clientId, name: 'Project 1', description: 'Project 1 description' })
      const updatedProject = createProject({ clientId, name: 'Project 2', description: 'Project 2 description' })
      const expectedResult = updatedProject

      const response = await postProjectRoute(project, app)
      const actualResponse = await putProjectRoute(response.body.id, updatedProject, app)

      expect(actualResponse.status).to.equal(200)
      assertPostProjectRequiredParams(actualResponse.body, expectedResult)
    })

    test('PUT project with existing name', async function () {
      const response = await postProjectRoute(defaultProjectWithClientId, app)
      const actualResponse = await putProjectRoute(response.body.id, defaultProjectWithClientId, app)

      expect(actualResponse.status).to.equal(409)
      expect(actualResponse.body).to.deep.equal({})
    })

    test('PUT project with non-existing project', async function () {
      const actualResponse = await putProjectRoute(invalidId, defaultProjectWithClientId, app)

      expect(actualResponse.status).to.equal(404)
    })

    test('PUT project with missing required client id path parameter', async function () {
      const invalidProject = createProject({ name: 'Project 2', description: 'Project 2 description' })

      const actualResponse = await putProjectRoute(invalidId, invalidProject, app)

      expect(actualResponse.status).to.equal(400)
      expect(actualResponse.body).deep.equal({})
    })

    test('DELETE project', async function () {
      const response = await postProjectRoute(defaultProjectWithClientId, app)
      const actualResponse = await deleteProjectRoute(response.body.id, app)

      expect(actualResponse.status).to.equal(204)
      expect(actualResponse.body).deep.equal({})
    })

    test('DELETE project with invalid id path parameter', async function () {
      const actualResponse = await deleteProjectRoute('123', app)

      expect(actualResponse.status).to.equal(400)
      expect(actualResponse.body).deep.equal({})
    })

    test('DELETE project with non-existing project', async function () {
      const actualResponse = await deleteProjectRoute(invalidId, app)

      expect(actualResponse.status).to.equal(404)
      expect(actualResponse.body).deep.equal({})
    })
  })

  describe('Project with Client', function () {
    beforeEach(async function () {
      await cleanupAll()
    })

    test('POST Project with client - all request body parameters', async function () {
      const expectedResult = defaultProject

      const actualResponse = await postProjectRoute(defaultProjectWithClient, app)

      expect(actualResponse.status).to.equal(201)
      assertPostProjectWithUnknownClientIdParams(actualResponse.body, expectedResult)
    })

    test('POST Project with client - only required request body parameters', async function () {
      const project = createProject({ name: 'Project 1', description: 'Project 1 description', ...defaultClient })

      const actualResponse = await postProjectRoute(project, app)

      const expectedResult = {
        clientId: actualResponse.body.clientId,
        ...project,
        startDate: null,
        endDate: null,
        budget: null,
        documentUrl: null,
      }

      expect(actualResponse.status).to.equal(201)
      assertPostProjectWithUnknownClientIdParams(actualResponse.body, expectedResult)
    })

    test('POST Project with client - invalid client', async function () {
      const invalidProject = createProject({
        name: 'Project 1',
        description: 'Project 1 description',
        firstName: null,
        lastName: null,
        company: null,
        role: null,
      })

      const actualResponse = await postProjectRoute(invalidProject, app)

      expect(actualResponse.status).to.equal(400)
      expect(actualResponse.body).deep.equal({})
    })

    test('POST with client - duplicate project', async function () {
      await postProjectRoute(defaultProjectWithClient, app)
      const actualResponse = await postProjectRoute(defaultProjectWithClient, app)

      expect(actualResponse.status).to.equal(409)
      expect(actualResponse.body).deep.equal({})
    })
  })
})
