const knex = require('knex')
const env = require('./env')
const { updateProjectObject } = require('./util/appUtil')

const client = knex({
  client: 'pg',
  migrations: {
    tableName: 'migrations',
  },
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
})

async function postProjectDb(reqBody) {
  return client('projects')
    .insert({
      client_id: reqBody.clientId,
      name: reqBody.name,
      description: reqBody.description,
      start_date: reqBody.startDate,
      end_date: reqBody.endDate,
      budget: reqBody.budget,
      documents_path: reqBody.documentsPath,
    })
    .returning([
      'id',
      'client_id AS clientId',
      'name',
      'description',
      'start_date AS startDate',
      'end_date AS endDate',
      'budget',
      'documents_path AS documentsPath',
    ])
}

async function getProjectsDb() {
  return client('projects AS p').select([
    'p.id',
    'p.client_id AS clientId',
    'p.name',
    'p.description',
    'p.start_date AS startDate',
    'p.end_date AS endDate',
    'p.budget',
    'p.documents_path AS documentsPath',
  ])
}

async function getProjectByNameDb(name) {
  return client('projects').select('name').where({ name })
}

async function getProjectByIdDb(id) {
  return client('projects')
    .select([
      'id',
      'client_id AS clientId',
      'name',
      'description',
      'start_date AS startDate',
      'end_date AS endDate',
      'budget',
      'documents_path AS documentsPath',
    ])
    .where({ id })
}

async function deleteProjectByIdDb(id) {
  return client('projects').where('id', id).del()
}

async function updateProjectDb(id, reqBody) {
  console.log('updated project', id, reqBody)
  const updatedProject = updateProjectObject(reqBody)

  return client('projects')
    .update({ ...updatedProject })
    .where({ id })
    .returning([
      'id',
      'client_id AS clientId',
      'name',
      'description',
      'start_date AS startDate',
      'end_date AS endDate',
      'budget',
      'documents_path AS documentsPath',
    ])
}

module.exports = {
  client,
  getProjectsDb,
  getProjectByNameDb,
  postProjectDb,
  getProjectByIdDb,
  deleteProjectByIdDb,
  updateProjectDb,
}
