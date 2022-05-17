const {
  findProjectsDb,
  findProjectByNameDb,
  addProjectDb,
  findProjectByIdDb,
  removeProjectDb,
  updateProjectDb,
  addClientDb,
  findClientsDb,
  findClientByIdDb,
  updateClientDb,
  removeClientDb,
  findProjectByNameAndWhereNotIdDb,
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
  const result = await findProjectsDb()

  return { statusCode: 200, result }
}

async function getProjectById(id) {
  const findResult = await findProjectByIdDb(id)

  if (findResult.length === 1) {
    return { statusCode: 200, result: findResult[0] }
  } else {
    return { statusCode: 404, result: {} }
  }
}

async function postProject(reqBody) {
  const findResult = await findProjectByNameDb(reqBody.name)

  if (findResult.length === 0) {
    if (reqBody.clientId) {
      const { statusCode: clientStatusCode } = await getClientById(reqBody.clientId)

      if (clientStatusCode === 200) {
        const result = await addProjectDb(reqBody)

        return { statusCode: 201, result: result[0] }
      } else {
        return { statusCode: clientStatusCode, result: {} }
      }
    } else {
      const { statusCode: clientStatusCode, result: clientResult } = await postClient(reqBody)

      if (clientStatusCode === 201) {
        const result = await addProjectDb({ ...reqBody, clientId: clientResult.id })

        return { statusCode: 201, result: result[0] }
      }
    }
  } else {
    return { statusCode: 409, result: {} }
  }
}

async function putProject(id, reqBody) {
  // lookup existing project by id
  const findProjectByIdResult = await findProjectByIdDb(id)

  // exists?
  if (findProjectByIdResult.length === 0) {
    return { statusCode: 404, result: {} }
  } else {
    // lookup all projects by name in case of clash, but exclude current project id as not a clash if name is unchanged
    const findProjectByNameAndWhereNotIdResult = await findProjectByNameAndWhereNotIdDb(reqBody.name, id)

    if (findProjectByNameAndWhereNotIdResult.length === 0) {
      const result = await updateProjectDb(id, reqBody)

      return { statusCode: 200, result: result[0] }
    } else {
      return { statusCode: 409, result: {} }
    }
  }
}

async function deleteProject(id) {
  const result = await findProjectByIdDb(id)

  if (result.length === 1) {
    await removeProjectDb(id)

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
  deleteProject,
  putProject,
}
