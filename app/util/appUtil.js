const updateProjectObject = (project) => {
  const updatedProject = {}

  //if (project && Object.keys(project).length > 0) {
  if (Object.keys(project).includes('clientId')) {
    updatedProject.client_id = project.clientId
  }
  if (Object.keys(project).includes('name')) {
    updatedProject.name = project.name
  }
  if (Object.keys(project).includes('description')) {
    updatedProject.description = project.description
  }
  if (Object.keys(project).includes('startDate')) {
    updatedProject.start_date = project.startDate
  }
  if (Object.keys(project).includes('endDate')) {
    updatedProject.end_date = project.endDate
  }
  if (Object.keys(project).includes('budget')) {
    updatedProject.budget = project.budget
  }
  if (Object.keys(project).includes('documentsPath')) {
    updatedProject.documents_path = project.documentsPath
  }
  //}
  return updatedProject
}

module.exports = {
  updateProjectObject,
}
