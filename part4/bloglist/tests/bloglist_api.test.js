const { test, after, beforeEach,describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')



describe('when there is initially some notes saved', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
      await Blog.insertMany(helper.initialBlogs)
    })
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are one blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, 2)
  })

test('new blog is created appropriately', async () => {

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

test('if like property is missing, it must be 0', async() =>{
    const blogPrueba = {
        title:"Blog de Prueba 3",
        author:"Mike",
        url:"https://pruebadeblog.com/",
    }
    
    await api
      .post('/api/blogs')
      .send(blogPrueba)
      .expect(201)
      .expect('Content-Type', /application\/json/)
       
      const blogEncontrado = await Blog.findOne({ title: 'Blog de Prueba 3' }).exec()
      
      assert.equal(blogEncontrado.likes,0)
      
})

test('if title or url properties are missing, it must return status 400', async() =>{
    const blogPrueba = {
        author:"Mike",
        likes: 5000
    }

    await api
    .post('/api/blogs')
    .send(blogPrueba)
    .expect(400)

})

})

describe('deletion of a blog', () => {
    test('deletion succeeds with status code 204 if id is valid', async () => {
      
      const blogsAtStart = await Blog.find()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await Blog.find()

      console.log("BLOGS INICIALES", blogsAtStart.length - 1)
      console.log("BLOGS FINALES", blogsAtEnd.length)

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

      const contents = blogsAtEnd.map(r => r.title)
      assert(!contents.includes(blogToDelete.title))
    })
  })

after(async () => {
  await mongoose.connection.close()
})