const { describe, test, before } = require('mocha')
const { expect } = require('chai')

const {
  createDefaultProject,
  createProject,
  assertPostProjectParams,
  assertPostProjectRequiredParams,
  assertGetProjects,
} = require('../helper/appHelper')
const { createHttpServer } = require('../../app/server')
const {
  getProjectByIdRoute,
  getProjectsRoute,
  postProjectRoute,
  putProjectRoute,
  deleteProjectByIdRoute,
} = require('../helper/routeHelper')
const { seed, cleanup } = require('../helper/seeds/project')
const moment = require('moment')

describe('routes', function () {
  describe('Project routes', function () {
    let app
    let clientId
    let invalidId
    let defaultProject

    before(async function () {
      await seed()

      app = await createHttpServer()
      clientId = 'c7b9e848-e2bb-456d-8eaa-129c1cb3580c'
      invalidId = '00000000-0000-0000-0000-000000000000'
      defaultProject = createDefaultProject({ clientId })
    })

    beforeEach(async function () {
      await cleanup('projects')
    })

    test('POST Project with all fields', async function () {
      const expectedResult = defaultProject

      const response = await postProjectRoute(defaultProject, app)

      expect(response.status).to.equal(201)
      assertPostProjectParams(response.body, expectedResult)
    })

    test('POST Project with only required request body parameters', async function () {
      const project = createProject({ clientId, name: 'Project 1', description: 'Project 1 description' })
      const expectedResult = {
        ...project,
        startDate: null,
        endDate: null,
        budget: null,
        documentsPath: null,
      }

      const response = await postProjectRoute(project, app)

      expect(response.status).to.equal(201)
      assertPostProjectRequiredParams(response.body, expectedResult)
    })

    test('POST Project missing client id', async function () {
      const project = createProject({ name: 'Project 1', description: 'Project 1 description' })

      const response = await postProjectRoute(project, app)

      expect(response.status).to.equal(400)
      expect(response.body).deep.equal({})
    })

    test('POST invalid project', async function () {
      const response = await postProjectRoute({}, app)

      expect(response.status).to.equal(400)
      expect(response.body).deep.equal({})
    })

    test('POST duplicate project', async function () {
      await postProjectRoute(defaultProject, app)
      const response = await postProjectRoute(defaultProject, app)

      expect(response.status).to.equal(409)
      expect(response.body).deep.equal({})
    })

    test('GET projects', async function () {
      const expectedResult = [defaultProject]

      await postProjectRoute(defaultProject, app)
      const response = await getProjectsRoute(app)

      expect(response.status).to.equal(200)
      assertGetProjects(response.body, expectedResult)
    })

    test('GET project by id', async function () {
      const expectedResult = defaultProject

      const projectResponse = await postProjectRoute(defaultProject, app)
      const response = await getProjectByIdRoute(projectResponse.body.id, app)

      expect(response.status).to.equal(200)
      assertPostProjectRequiredParams(response.body, expectedResult)
    })

    test('GET project by id with invalid path parameter', async function () {
      const response = await getProjectByIdRoute(invalidId, app)

      expect(response.status).to.equal(404)
    })

    test('PUT project with only required fields', async function () {
      const project = createProject({ clientId, name: 'Project 1', description: 'Project 1 description' })
      const projectUpdate = createProject({ clientId, name: 'Project 2', description: 'Project 2 description' })
      const expectedResult = projectUpdate

      const projectResponse = await postProjectRoute(project, app)
      const response = await putProjectRoute(projectResponse.body.id, projectUpdate, app)

      expect(response.status).to.equal(200)
      assertPostProjectRequiredParams(response.body, expectedResult)
    })

    test('PUT project with invalid id path parameter', async function () {
      const project = createProject({
        clientId,
        name: 'Project 2',
        description: 'Project 2 description',
        startDate: moment().startOf('day').toISOString(),
        endDate: moment().endOf('day').toISOString(),
        budget: 200000.0,
        documentsPath: 'http://digitalcatapult.org.uk/document/path',
      })

      const response = await putProjectRoute(invalidId, project, app)

      expect(response.status).to.equal(404)
    })

    test('PUT project with missing required client id path parameter', async function () {
      const project = createProject({
        name: 'Project 2',
        description: 'Project 2 description',
        startDate: moment().startOf('day').toISOString(),
        endDate: moment().endOf('day').toISOString(),
        budget: 200000.0,
        documentsPath: 'http://digitalcatapult.org.uk/document/path',
      })

      const response = await putProjectRoute(invalidId, project, app)

      expect(response.status).to.equal(400)
      expect(response.body).deep.equal({})
    })

    test('PUT project with all request body parameters', async function () {
      const project = createProject({
        name: 'Project 2',
        description: 'Project 2 description',
        startDate: moment().startOf('day').toISOString(),
        endDate: moment().endOf('day').toISOString(),
        budget: 200000.0,
        documentsPath: 'http://digitalcatapult.org.uk/document/path',
      })

      const response = await putProjectRoute(invalidId, project, app)

      expect(response.status).to.equal(400)
      expect(response.body).deep.equal({})
    })

    test('DELETE project', async function () {
      const projectResponse = await postProjectRoute(defaultProject, app)
      const response = await deleteProjectByIdRoute(projectResponse.body.id, app)

      expect(response.status).to.equal(204)
      expect(response.body).deep.equal({})
    })

    test('DELETE project with invalid id path parameter', async function () {
      const response = await deleteProjectByIdRoute(invalidId, app)

      expect(response.status).to.equal(404)
    })
  })
})
