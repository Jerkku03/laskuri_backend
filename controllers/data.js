const dataRouter = require('express').Router()

const data = require('../data.json')

dataRouter.get('/', async (request, response) => {
    response.json(data)
  })

module.exports = dataRouter