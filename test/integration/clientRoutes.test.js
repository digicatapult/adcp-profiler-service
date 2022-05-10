const { describe, test, before } = require('mocha')
const { expect } = require('chai')

const { createDefaultClient, assertClientParams, assertGetClients, createClient } = require('../helper/appHelper')
const { createHttpServer } = require('../../app/server')
const {
  postClientRoute,
  getClientsRoute,
  getClientByIdRoute,
  putClientRoute,
  deleteClientRoute,
} = require('../helper/clientRouteHelper')
const { cleanupAll, cleanup } = require('../../seeds/project')

describe('Client routes', function () {
  let app
  let defaultClient
  let invalidClientId

  before(async function () {
    await cleanupAll()

    app = await createHttpServer()

    defaultClient = createDefaultClient()
    invalidClientId = '00000000-0000-0000-0000-000000000000'
  })

  beforeEach(async function () {
    await cleanup('clients')
  })

  test('POST Client', async function () {
    const expectedResult = defaultClient

    const actualResponse = await postClientRoute(defaultClient, app)

    expect(actualResponse.status).to.equal(201)
    assertClientParams(actualResponse.body, expectedResult)
  })

  test('POST client missing fields', async function () {
    const actualResponse = await postClientRoute({}, app)

    expect(actualResponse.status).to.equal(400)
    expect(actualResponse.body).to.deep.equal({})
  })

  test('GET clients', async function () {
    const expectedResult = [defaultClient]

    await postClientRoute(defaultClient, app)
    const actualResponse = await getClientsRoute(app)

    expect(actualResponse.status).to.equal(200)
    assertGetClients(actualResponse.body, expectedResult)
  })

  test('GET client by id', async function () {
    const expectedResult = defaultClient

    const response = await postClientRoute(defaultClient, app)
    const actualResponse = await getClientByIdRoute(response.body.id, app)

    expect(actualResponse.status).to.equal(200)
    assertClientParams(actualResponse.body, expectedResult)
  })

  test('GET client by id for non-existing client', async function () {
    const actualResponse = await getClientByIdRoute(invalidClientId, app)

    expect(actualResponse.status).to.equal(404)
    expect(actualResponse.body).to.deep.equal({})
  })

  test('GET client by id with invalid path id parameter', async function () {
    const actualResponse = await getClientByIdRoute(1, app)

    expect(actualResponse.status).to.equal(400)
    expect(actualResponse.body).to.deep.equal({})
  })

  test('PUT client', async function () {
    const client = createClient({
      firstName: 'First name 2',
      lastName: 'Last name 2',
      company: 'Company 2',
      role: 'Role 2',
    })
    const expectedResult = client

    const response = await postClientRoute(defaultClient, app)
    const actualResponse = await putClientRoute(response.body.id, client, app)

    expect(actualResponse.status).to.equal(200)
    assertClientParams(actualResponse.body, expectedResult)
  })

  test('PUT client with missing fields', async function () {
    const actualResponse = await putClientRoute(invalidClientId, {}, app)

    expect(actualResponse.status).to.equal(400)
    expect(actualResponse.body).to.deep.equal({})
  })

  test('PUT client for non-existing client', async function () {
    const actualResponse = await putClientRoute(invalidClientId, defaultClient, app)

    expect(actualResponse.status).to.equal(404)
    expect(actualResponse.body).to.deep.equal({})
  })

  test('PUT client with invalid id path parameter', async function () {
    const actualResponse = await putClientRoute('123', defaultClient, app)

    expect(actualResponse.status).to.equal(400)
    expect(actualResponse.body).to.deep.equal({})
  })

  test('DELETE client', async function () {
    const response = await postClientRoute(defaultClient, app)
    const actualResponse = await deleteClientRoute(response.body.id, app)

    expect(actualResponse.status).to.equal(204)
    expect(actualResponse.body).to.deep.equal({})
  })

  test('DELETE client for non-existing client', async function () {
    const actualResponse = await deleteClientRoute(invalidClientId, app)

    expect(actualResponse.status).to.equal(404)
    expect(actualResponse.body).to.deep.equal({})
  })

  test('DELETE client with invalid id path parameter', async function () {
    const actualResponse = await deleteClientRoute('123', app)

    expect(actualResponse.status).to.equal(400)
    expect(actualResponse.body).to.deep.equal({})
  })
})
