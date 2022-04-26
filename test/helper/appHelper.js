const { validate: uuidValidate, version: uuidVersion } = require('uuid')
const { expect } = require('chai')

const assertUuidV4 = (id) => {
  expect(uuidValidate(id) && uuidVersion(id) === 4).to.be.true
}

const assertPostProjectRequiredParams = (actualResult, expectedResult) => {
  assertUuidV4(actualResult.id)
  expect(actualResult.clientId).to.equal(expectedResult.clientId)
  expect(actualResult.name).to.equal(expectedResult.name)
  expect(actualResult.description).to.equal(expectedResult.description)
}

const assertPostProjectParams = (actualResult, expectedResult) => {
  assertPostProjectRequiredParams(actualResult, expectedResult)

  expect(actualResult.startDate).to.equal(expectedResult.startDate)
  expect(actualResult.endDate).to.equal(expectedResult.endDate)
  expect(actualResult.budget).to.equal(expectedResult.budget)
  expect(actualResult.documentsPath).to.equal(expectedResult.documentsPath)
}

module.exports = {
  assertUuidV4,
  assertPostProjectParams,
  assertPostProjectRequiredParams,
}
