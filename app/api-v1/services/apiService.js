const {
  getProjectsDb,
  getProjectByNameDb,
  postProjectDb,
  getProjectByIdDb,
  deleteProjectByIdDb,
  updateProjectDb,
} = require('../../db')

const { updateProjectObject } = require('../../util/appUtil')

async function getProjects() {
  const result = await getProjectsDb()

  return { statusCode: 200, result }
}

async function getProjectByName(name) {
  const nameResults = await getProjectByNameDb(name)

  if (nameResults.length === 0) {
    return { statusCode: 404, result: {} }
  } else {
    const result = nameResults.length === 1 ? nameResults[0] : {}
    return { statusCode: 200, result }
  }
}

async function getProjectById(id) {
  const itemsByIdResult = await getProjectByIdDb(id)

  if (itemsByIdResult.length === 0) {
    return { statusCode: 404, result: {} }
  } else {
    const result = itemsByIdResult.length === 1 ? itemsByIdResult[0] : {}
    return { statusCode: 200, result }
  }
}

async function postProject(reqBody) {
  const itemsByIdResult = await getProjectByNameDb(reqBody.name)

  if (itemsByIdResult.length > 0) {
    return { statusCode: 409, result: {} }
  } else {
    const createdProject = await postProjectDb(reqBody)

    const result = createdProject.length === 1 ? createdProject[0] : {}

    return { statusCode: 201, result }
  }
}

async function putProject(id, reqBody) {
  const projectByIdResult = await getProjectByIdDb(id)

  const updatedProject = updateProjectObject(reqBody)

  if (projectByIdResult.length === 0) {
    return { statusCode: 404, result: {} }
  } else {
    const result = await updateProjectDb(id, updatedProject)
    return { statusCode: 200, result }
  }
}

async function deleteProjectById(id) {
  const result = await getProjectByIdDb(id)

  if (result.length === 0) {
    return { statusCode: 404, result: {} }
  } else {
    await deleteProjectByIdDb(id)

    return { statusCode: 204, result: {} }
  }
}

module.exports = {
  getProjects,
  postProject,
  getProjectByName,
  getProjectById,
  deleteProjectById,
  putProject,
}
