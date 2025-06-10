const dataRouter = require('express').Router()

//https://co2data.fi/api/co2data_construction.json

const data = require('../data.json')

dataRouter.get('/', async (request, response) => {
    response.json(data)
  })

module.exports = dataRouter