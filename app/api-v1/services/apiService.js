const {
  getProjectsDb,
  getProjectByNameDb,
  postProjectDb,
  findProjectByIdDb,
  deleteProjectByIdDb,
  updateProjectDb,
} = require('../../db')

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
  const itemsByIdResult = await findProjectByIdDb(id)

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
  const { result: projectByIdResult, statusCode: projectByIdStatusCode } = await findProjectByIdDb(id)

  if (projectByIdStatusCode === 404) {
    return { statusCode: 404, result: {} }
  } else if (projectByIdResult.length === 1) {
    const updateItemResult = await updateProjectDb(id, reqBody)
    const result = updateItemResult[0]

    return { statusCode: 200, result }
  } else {
    return { statusCode: 409, result: {} }
  }
}

async function deleteProjectById(id) {
  const { statusCode: projectByIdStatusCode } = await findProjectByIdDb(id)

  if (projectByIdStatusCode === 404) {
    return { statusCode: projectByIdStatusCode, result: {} }
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
