const { validate: uuidValidate, version: uuidVersion } = require('uuid')
const { expect } = require('chai')
const moment = require('moment')

const createProject = (project) => {
  const projectObj = { ...project }

  return projectObj
}

const createDefaultProject = ({ clientId }) => {
  return createProject({
    clientId,
    name: 'Project 1',
    description: 'Project 2 Description',
    startDate: moment().startOf('day').toISOString(),
    endDate: moment().endOf('day').toISOString(),
    budget: 100000,
    documentUrl: 'http://www.digitalcatapult.org.uk/document/url',
  })
}

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
  expect(actualResult.documentUrl).to.equal(expectedResult.documentUrl)
}

const assertGetProjects = (actualResult, expectedResult) => {
  expect(actualResult.length).to.equal(expectedResult.length)

  actualResult.forEach((item, index) => {
    assertPostProjectParams(item, expectedResult[index])
  })
}

module.exports = {
  createProject,
  createDefaultProject,
  assertUuidV4,
  assertPostProjectParams,
  assertPostProjectRequiredParams,
  assertGetProjects,
}
