const knex = require('knex')
const env = require('./env')

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
  return client('profiler').insert(reqBody).returning(['name', 'description'])
}

async function postProjectWithIdDb(reqBody) {
  return client('profiler').insert(reqBody).returning(['id', 'name', 'description'])
}

async function getProjectsDb() {
  return client('profiler').select(['name', 'description'])
}

async function getProjectByNameDb(name) {
  return client('profiler').select('name').where({ name })
}

async function findProjectByIdDb(id) {
  return client('profiler').select('id').where({ id })
}

async function deleteProjectByIdDb(id) {
  return client('profiler').select('id').where({ id }).del()
}

module.exports = {
  client,
  getProjectsDb,
  getProjectByNameDb,
  postProjectDb,
  findProjectByIdDb,
  deleteProjectByIdDb,
  postProjectWithIdDb,
}
