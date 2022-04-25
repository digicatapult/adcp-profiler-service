const { getProjectsDb, getProjectByNameDb, postProjectDb } = require('../../db')

async function getProjects() {
  return getProjectsDb()
}

async function postProject(reqBody) {
  const initialProjectSearch = await getProjectByNameDb(reqBody.name)
  if (initialProjectSearch.length > 0) {
    return { statusCode: 409, result: {} }
  } else {
    const createdProject = await postProjectDb(reqBody)

    const result = createdProject.length === 1 ? createdProject[0] : {}

    return { statusCode: 201, result }
  }
}

module.exports = {
  getProjects,
  postProject,
}
