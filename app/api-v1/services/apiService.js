const { findProfilesDb } = require('../../db')

function getProfiles() {
  return findProfilesDb()
}

module.exports = {
  getProfiles,
}
