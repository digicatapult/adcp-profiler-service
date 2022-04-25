const { client } = require('../../app/db')

const cleanup = async () => {
  await client('profiler').del()
}

module.exports = {
  cleanup,
}
