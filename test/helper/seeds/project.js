const { client } = require('../../../app/db')

const cleanup = async () => {
  await client('projects').del()
}

module.exports = {
  cleanup,
}
