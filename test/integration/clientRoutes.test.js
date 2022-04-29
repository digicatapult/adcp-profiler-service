const { describe, test, before } = require('mocha')
const { expect } = require('chai')

const { createDefaultClient, assertClientParams } = require('../helper/appHelper')
const { createHttpServer } = require('../../app/server')
const { postClientRoute } = require('../helper/clientRouteHelper')
const { cleanupAll } = require('../helper/seeds/project')

describe('Client routes', function () {
  let app
  let defaultClient

  before(async function () {
    app = await createHttpServer()

    defaultClient = createDefaultClient()
  })

  beforeEach(async function () {
    await cleanupAll()
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

  test.skip('POST invalid client', async function () {})

  test.skip('GET clients', async function () {})

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
