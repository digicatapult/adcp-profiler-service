const { describe, test, before } = require('mocha')
const { expect } = require('chai')

const { createDefaultClient, assertClientParams, assertGetClients } = require('../helper/appHelper')
const { createHttpServer } = require('../../app/server')
const { postClientRoute, getClientsRoute } = require('../helper/clientRouteHelper')
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

    const response = await postClientRoute(defaultClient, app)

    expect(response.status).to.equal(201)
    assertClientParams(response.body, expectedResult)
  })

  test('POST client missing fields', async function () {
    const response = await postClientRoute({}, app)

    expect(response.status).to.equal(400)
    expect(response.body).to.deep.equal({})
  })

  test('GET clients', async function () {
    const expectedResult = [defaultClient]

    await postClientRoute(defaultClient, app)
    const response = await getClientsRoute(app)

    expect(response.status).to.equal(200)
    assertGetClients(response.body, expectedResult)
  })

  test.skip('GET client by id', async function () {})

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
