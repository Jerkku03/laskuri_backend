const mongoose = require('mongoose')
const allProjectsRouter = require('express').Router()
const Project = require('../models/project')
const User = require('../models/user')
require('express-async-errors')
const { userExtractor } = require('../utils/middleware')


allProjectsRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const projects = await Project
        .find({})
        .populate('user', {username: 1})
            if (projects.length > 0){
            response.json(projects.filter((project) => project.user.id == id))
            return}
})

module.exports = allProjectsRouter