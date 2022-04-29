const { describe, test, before } = require('mocha')
const { expect } = require('chai')
const moment = require('moment')

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
  deleteProjectRoute,
} = require('../helper/projectRouteHelper')
const { seed, cleanup } = require('../helper/seeds/project')

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

  test('POST Project all request body parameters', async function () {
    const expectedResult = defaultProject

    const actualResponse = await postProjectRoute(defaultProject, app)

    expect(actualResponse.status).to.equal(201)
    assertPostProjectParams(actualResponse.body, expectedResult)
  })

  test('POST Project with only required request body parameters', async function () {
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

  test('POST Project missing client id', async function () {
    const invalidProject = createProject({ name: 'Project 1', description: 'Project 1 description' })

    const actualResponse = await postProjectRoute(invalidProject, app)

    expect(actualResponse.status).to.equal(400)
    expect(actualResponse.body).deep.equal({})
  })

  test('POST invalid project', async function () {
    const actualResponse = await postProjectRoute({}, app)

    expect(actualResponse.status).to.equal(400)
    expect(actualResponse.body).deep.equal({})
  })

  test('POST duplicate project', async function () {
    await postProjectRoute(defaultProject, app)
    const actualResponse = await postProjectRoute(defaultProject, app)

    expect(actualResponse.status).to.equal(409)
    expect(actualResponse.body).deep.equal({})
  })

  test('GET projects', async function () {
    const expectedResult = [defaultProject]

    await postProjectRoute(defaultProject, app)
    const actualResponse = await getProjectsRoute(app)

    expect(actualResponse.status).to.equal(200)
    assertGetProjects(actualResponse.body, expectedResult)
  })

  test('GET project by id', async function () {
    const expectedResult = defaultProject

    const response = await postProjectRoute(defaultProject, app)
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

    const response = await postProjectRoute(defaultProject, app)
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
    const response = await postProjectRoute(defaultProject, app)
    const actualResponse = await putProjectRoute(response.body.id, defaultProject, app)

    expect(actualResponse.status).to.equal(409)
    expect(actualResponse.body).to.deep.equal({})
  })

  test('PUT project with non-existing project', async function () {
    const actualResponse = await putProjectRoute(invalidId, defaultProject, app)

    expect(actualResponse.status).to.equal(404)
  })

  test('PUT project with missing required client id path parameter', async function () {
    const invalidProject = createProject({ name: 'Project 2', description: 'Project 2 description' })

    const actualResponse = await putProjectRoute(invalidId, invalidProject, app)

    expect(actualResponse.status).to.equal(400)
    expect(actualResponse.body).deep.equal({})
  })

  test('DELETE project', async function () {
    const response = await postProjectRoute(defaultProject, app)
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
