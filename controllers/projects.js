const mongoose = require('mongoose')
const projectsRouter = require('express').Router()
const Project = require('../models/project')
const User = require('../models/user')
require('express-async-errors')
const jwt = require('jsonwebtoken')
const { response } = require('express')

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

projectsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  if (body.title == undefined || body.url == undefined){
    response.status(400)
    .catch(error => next(error))
    return 
  }

  const project = new Project({
    name: body.name,
    user: user._id
  })
  
const savedProject = await project.save()
  user.projects = user.projects.concat(savedProject._id)
  await user.save()
})

module.exports = projectsRouter
