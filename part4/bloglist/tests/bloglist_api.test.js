const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)
const model = require('../models/blog')




test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are one blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, 1)
  })

test.only('new blog is created appropriately', async () => {

    const blogPrueba = {
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

test.only('if like property is missing, it must be 0', async() =>{
    const blogPrueba = {
        title:"Blog de Prueba 3",
        author:"Mike",
        url:"https://pruebadeblog.com/",
    }

    const Blog = mongoose.model('Blog', model.blogSchema)
    
    await api
      .post('/api/blogs')
      .send(blogPrueba)
      .expect(201)
      .expect('Content-Type', /application\/json/)
       
      const blogEncontrado = await Blog.findOne({ title: 'Blog de Prueba 3' }).exec()
      
      assert.equal(blogEncontrado.likes,0)
      
})

test.only('if title or url properties are missing, it must return status 400', async() =>{
    const blogPrueba = {
        author:"Mike",
        likes: 5000
    }

    await api
    .post('/api/blogs')
    .send(blogPrueba)
    .expect(400)

})

after(async () => {
  await mongoose.connection.close()
})