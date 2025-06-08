const mongoose = require('mongoose')
const projectsRouter = require('express').Router()
const Project = require('../models/project')
const User = require('../models/user')
require('express-async-errors')
const { userExtractor } = require('../utils/middleware')

projectsRouter.get('/', async (request, response) => {
    const projects = await Project
        .find({})
        .populate('user', {username: 1})
            response.json(projects)
})

projectsRouter.get('/:id', async (request, response, next) => {
  const project = await Project.findById(request.params.id)
      if (project) {
        response.json(project)
      } else {
        response.status(404).end()
      }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

projectsRouter.post('/', userExtractor, async (request, response) => {
  const {user} = request

  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }

  const {projectName} = request.body

  const project = new Project({
    projectName: projectName,
    user: user
  })
  
const savedProject = await project.save()
  user.projects = user.projects.concat(savedProject._id)
  await user.save()

  response.status(201).json(savedProject)
})

projectsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { user } = request

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const project = await Project.findById(request.params.id)

  if ( project?.user.toString() === user._id.toString() ){
    await Project.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else{
    response.status(401).json({ error: 'unauthorized access' })
  }

})

module.exports = projectsRouter
