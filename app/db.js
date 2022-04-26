const knex = require('knex')
const env = require('./env')

const now = () => knex.fn.now()
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
  return client('projects').select('*')
}

async function getProjectByNameDb(name) {
  return client('projects').select('name').where({ name })
}

async function findProjectByIdDb(id) {
  return client('projects').select('id').where({ id })
}

async function deleteProjectByIdDb(id) {
  return client('projects').select('id').where({ id }).del()
}

async function updateProjectDb(id, reqBody) {
  return client('projects')
    .select('id')
    .where({ id })
    .update({
      client_id: reqBody.clientId,
      name: reqBody.name,
      description: reqBody.description,
      start_date: reqBody.startDate,
      end_date: reqBody.endDate,
      budget: reqBody.budget,
      documents_path: reqBody.documentsPath,
      updated_at: now(),
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

module.exports = {
  client,
  getProjectsDb,
  getProjectByNameDb,
  postProjectDb,
  findProjectByIdDb,
  deleteProjectByIdDb,
  updateProjectDb,
}
