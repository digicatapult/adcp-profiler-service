const { validate: uuidValidate, version: uuidVersion } = require('uuid')
const { expect } = require('chai')

const assertUuidV4 = (id) => {
  expect(uuidValidate(id) && uuidVersion(id) === 4).to.be.true
}

module.exports = {
  assertUuidV4,
}
