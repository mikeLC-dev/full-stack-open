const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)



test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('there are one blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, 1)
  })

test.only('new blog is created appropriately', async () => {

    const blogPrueba = {
        id:"654n6s5d4fh6a5sdf4j65dswaf4h",
        title:"Blog de Prueba 1",
        author:"Mike",
        url:"https://pruebadeblog.com/",
        likes:500
    }

    await api
      .post('/api/blogs')
      .send(blogPrueba)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

after(async () => {
  await mongoose.connection.close()
})