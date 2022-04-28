const {
  getProjectsDb,
  getProjectByNameDb,
  postProjectDb,
  getProjectByIdDb,
  deleteProjectByIdDb,
  updateProjectDb,
} = require('../../db')

async function getProjects() {
  const result = await getProjectsDb()

  return { statusCode: 200, result }
}

async function getProjectById(id) {
  const projectsByIdResult = await getProjectByIdDb(id)

  if (projectsByIdResult.length === 0) {
    return { statusCode: 404, result: {} }
  } else {
    const result = projectsByIdResult.length === 1 ? projectsByIdResult[0] : {}

    return { statusCode: 200, result }
  }
}

async function postProject(reqBody) {
  const projectByIdResult = await getProjectByNameDb(reqBody.name)

  if (projectByIdResult.length > 0) {
    return { statusCode: 409, result: {} }
  } else {
    const createdProject = await postProjectDb(reqBody)

    const result = createdProject.length === 1 ? createdProject[0] : {}

    return { statusCode: 201, result }
  }
}

async function putProject(id, reqBody) {
  const projectByIdResult = await getProjectByIdDb(id)

  if (projectByIdResult.length === 0) {
    return { statusCode: 404, result: {} }
  } else if (projectByIdResult[0].name !== reqBody.name) {
    const result = await updateProjectDb(id, reqBody)

    return { statusCode: 200, result: result[0] }
  } else {
    return { statusCode: 409, result: {} }
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
  getProjectById,
  deleteProjectById,
  putProject,
}
