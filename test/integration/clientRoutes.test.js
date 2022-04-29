const { describe, test, before } = require('mocha')
const { expect } = require('chai')

const { createDefaultClient, assertClientParams, assertGetClients } = require('../helper/appHelper')
const { createHttpServer } = require('../../app/server')
const { postClientRoute, getClientsRoute, getClientByIdRoute } = require('../helper/clientRouteHelper')
const { cleanupAll, cleanup } = require('../helper/seeds/project')

describe('Client routes', function () {
  let app
  let defaultClient

  before(async function () {
    await cleanupAll()

    app = await createHttpServer()

    defaultClient = createDefaultClient()
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
    console.log(actualResponse.body)

    expect(actualResponse.status).to.equal(200)
    assertClientParams(actualResponse.body, expectedResult)
  })

  test.skip('GET client by id for non-existing client', async function () {})

  test.skip('GET client by id with invalid path id parameter', async function () {})

  test.skip('PUT client', async function () {})

  test.skip('PUT client for non-existing client', async function () {})

  test.skip('PUT client with invalid id path parameter', async function () {})

  test.skip('PUT client with missing fields', async function () {})

  test.skip('DELETE client', async function () {})

  test.skip('DELETE client for non-existing client', async function () {})

  test.skip('DELETE client with invalid id path parameter', async function () {})
})
