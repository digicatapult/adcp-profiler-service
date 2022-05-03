const {
  getProjectsDb,
  getProjectByNameDb,
  postProjectDb,
  getProjectByIdDb,
  deleteProjectByIdDb,
  updateProjectDb,
  addClientDb,
  findClientsDb,
  findClientByIdDb,
  updateClientDb,
  removeClientDb,
} = require('../../db')

async function getClients() {
  const result = await findClientsDb()

  return { statusCode: 200, result }
}

async function getClientById(id) {
  const result = await findClientByIdDb(id)

  if (result.length === 1) {
    return { statusCode: 200, result: result[0] }
  } else {
    return { statusCode: 404, result: {} }
  }
}

async function postClient(reqBody) {
  const result = await addClientDb(reqBody)

  return { statusCode: 201, result: result[0] }
}

async function putClient(id, reqBody) {
  const findResult = await findClientByIdDb(id)

  if (findResult.length === 1) {
    const result = await updateClientDb(id, reqBody)

    return { statusCode: 200, result: result[0] }
  } else {
    return { statusCode: 404, result: {} }
  }
}

async function deleteClient(id) {
  const findResult = await findClientByIdDb(id)

  if (findResult.length === 1) {
    await removeClientDb(id)

    return { statusCode: 204 }
  } else {
    return { statusCode: 404, result: {} }
  }
}

async function getProjects() {
  const result = await getProjectsDb()

  return { statusCode: 200, result }
}

async function getProjectById(id) {
  const projectsByIdResult = await getProjectByIdDb(id)

  if (projectsByIdResult.length === 1) {
    return { statusCode: 200, result: projectsByIdResult[0] }
  } else {
    return { statusCode: 404, result: {} }
  }
}

async function postProject(reqBody) {
  const projectByNameResult = await getProjectByNameDb(reqBody.name)

  if (projectByNameResult.length === 0) {
    const createdProject = await postProjectDb(reqBody)

    return { statusCode: 201, result: createdProject[0] }
  } else {
    return { statusCode: 409, result: {} }
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

  if (result.length === 1) {
    await deleteProjectByIdDb(id)

    return { statusCode: 204, result: {} }
  } else {
    return { statusCode: 404, result: {} }
  }
}

module.exports = {
  getClients,
  getClientById,
  postClient,
  putClient,
  deleteClient,
  getProjects,
  postProject,
  getProjectById,
  deleteProjectById,
  putProject,
}
