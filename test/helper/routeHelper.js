/* eslint no-console: "off" */
const request = require('supertest')

const { API_MAJOR_VERSION } = require('../../app/env')

async function apiDocs({ app }) {
  return request(app)
    .get(`/${API_MAJOR_VERSION}/api-docs`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`healthCheckErr ${err}`)
      return err
    })
}

async function healthCheck({ app }) {
  return request(app)
    .get('/health')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`healthCheckErr ${err}`)
      return err
    })
}

async function getProjectsRoute({ app }) {
  return request(app)
    .get(`/${API_MAJOR_VERSION}/profiler/project`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`getProjectsErr ${err}`)
      return err
    })
}

async function getProjectByIdRoute(id, { app }) {
  return request(app)
    .get(`/${API_MAJOR_VERSION}/profiler/project/${id}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`getProjectsErr ${err}`)
      return err
    })
}

async function createProjectRoute(project, { app }) {
  return request(app)
    .post(`/${API_MAJOR_VERSION}/profiler/project`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(project)
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`postProjectErr ${err}`)
      return err
    })
}

async function putProjectRoute(id, project, { app }) {
  return request(app)
    .put(`/${API_MAJOR_VERSION}/profiler/project/${id}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(project)
    .then((response) => {
      console.log('project', project)
      console.log('response', response)
      return response
    })
    .catch((err) => {
      console.error(`putProjectErr ${err}`)
      return err
    })
}

async function deleteProjectByIdRoute(id, { app }) {
  return request(app)
    .delete(`/${API_MAJOR_VERSION}/profiler/project/${id}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`getProjectsErr ${err}`)
      return err
    })
}

module.exports = {
  apiDocs,
  healthCheck,
  getProjectsRoute,
  createProjectRoute,
  getProjectByIdRoute,
  putProjectRoute,
  deleteProjectByIdRoute,
}
