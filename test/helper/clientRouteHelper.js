/* eslint no-console: "off" */
const request = require('supertest')

const { API_MAJOR_VERSION } = require('../../app/env')

async function getClientsRoute({ app }) {
  return request(app)
    .get(`/${API_MAJOR_VERSION}/profiler/client`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`getClientsErr ${err}`)
      return err
    })
}

async function getClientByIdRoute(id, { app }) {
  return request(app)
    .get(`/${API_MAJOR_VERSION}/profiler/client/${id}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`getClientsErr ${err}`)
      return err
    })
}

async function postClientRoute(client, { app }) {
  return request(app)
    .post(`/${API_MAJOR_VERSION}/profiler/client`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(client)
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`postClientErr ${err}`)
      return err
    })
}

async function putClientRoute(id, client, { app }) {
  return request(app)
    .put(`/${API_MAJOR_VERSION}/profiler/client/${id}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(client)
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`putClientErr ${err}`)
      return err
    })
}

async function deleteClientByIdRoute(id, { app }) {
  return request(app)
    .delete(`/${API_MAJOR_VERSION}/profiler/client/${id}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`getClientsErr ${err}`)
      return err
    })
}

module.exports = {
  getClientsRoute,
  postClientRoute,
  getClientByIdRoute,
  putClientRoute,
  deleteClientByIdRoute,
}
