const { client } = require('../../../app/db')

const cleanup = async (tableName) => {
  await client(tableName).del()
}

const cleanupAll = async () => {
  await client('project_services').del()
  await client('projects').del()
  await client('clients').del()
}

const seed = async () => {
  await cleanupAll()

  const clientId = 'c7b9e848-e2bb-456d-8eaa-129c1cb3580c'

  await client('clients').insert([
    {
      id: clientId,
      first_name: 'Steve',
      last_name: 'Davies',
      company: 'MyCompany',
      role: 'Manager',
    },
  ])
}

module.exports = {
  cleanup,
  cleanupAll,
  seed,
}
