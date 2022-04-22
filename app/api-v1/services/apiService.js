const { findProjectsDb } = require('../../db')

async function getProjects() {
  return findProjectsDb()
}

module.exports = {
  getProjects,
}
