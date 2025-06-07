const bcrypt = require('bcrypt')
const User = require('../models/user')
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

describe('user credentials in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const newUser = {
        _id: "6745d5ac57560d2cfdab5c10",
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })
  
    test('login succeeds', async () => {
      const knownUser = {
        _id: "6745d5ac57560d2cfdab5c10",
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
      await api
        .post('/api/login')
        .send(knownUser)
        .expect(200)

    })
})