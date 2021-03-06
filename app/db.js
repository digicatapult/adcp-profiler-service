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

async function findClientsDb() {
  return client('clients').select(['id', 'first_name AS firstName', 'last_name AS lastName', 'company', 'role'])
}

async function findClientByIdDb(id) {
  return client('clients')
    .select(['id', 'first_name AS firstName', 'last_name AS lastName', 'company', 'role'])
    .where({ id })
}

async function addClientDb(reqBody) {
  return client('clients')
    .insert({
      first_name: reqBody.firstName,
      last_name: reqBody.lastName,
      company: reqBody.company,
      role: reqBody.role,
    })
    .returning(['id', 'first_name AS firstName', 'last_name AS lastName', 'company', 'role'])
}

async function updateClientDb(id, reqBody) {
  return client('clients')
    .update({
      first_name: reqBody.firstName,
      last_name: reqBody.lastName,
      company: reqBody.company,
      role: reqBody.role,
    })
    .where({ id })
    .returning(['id', 'first_name AS firstName', 'last_name AS lastName', 'company', 'role'])
}

async function removeClientDb(id) {
  return client('clients').del().where({ id })
}

async function addProjectDb(reqBody) {
  return client('projects')
    .insert({
      client_id: reqBody.clientId,
      name: reqBody.name,
      description: reqBody.description,
      start_date: reqBody.startDate,
      end_date: reqBody.endDate,
      budget: reqBody.budget,
      document_url: reqBody.documentUrl,
    })
    .returning([
      'id',
      'client_id AS clientId',
      'name',
      'description',
      'start_date AS startDate',
      'end_date AS endDate',
      'budget',
      'document_url AS documentUrl',
    ])
}

async function findProjectsDb() {
  return client('projects AS p').select([
    'p.id',
    'p.client_id AS clientId',
    'p.name',
    'p.description',
    'p.start_date AS startDate',
    'p.end_date AS endDate',
    'p.budget',
    'p.document_url AS documentUrl',
  ])
}

async function findProjectByNameDb(name) {
  return client('projects').select('name').where({ name })
}

async function findProjectByNameAndWhereNotIdDb(name, id) {
  return client('projects').select('name').where({ name }).andWhereNot({ id })
}

async function findProjectByIdDb(id) {
  return client('projects')
    .select([
      'id',
      'client_id AS clientId',
      'name',
      'description',
      'start_date AS startDate',
      'end_date AS endDate',
      'budget',
      'document_url AS documentUrl',
    ])
    .where({ id })
}

async function removeProjectDb(id) {
  return client('projects').where('id', id).del()
}

async function updateProjectDb(id, reqBody) {
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
      'document_url AS documentUrl',
    ])
}

module.exports = {
  client,
  findClientsDb,
  findClientByIdDb,
  addClientDb,
  updateClientDb,
  removeClientDb,
  findProjectsDb,
  findProjectByNameDb,
  findProjectByNameAndWhereNotIdDb,
  addProjectDb,
  findProjectByIdDb,
  removeProjectDb,
  updateProjectDb,
}
