const { test, after, beforeEach,describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    const noteObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = noteObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
    
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, 2)
  })

})

describe('creation of a blog', () => {
    let headers

    beforeEach(async () => {
        await User.deleteMany({})
        const newUser = {
        username: 'root',
        name: 'root',
        password: 'password',
        }

        await api
        .post('/api/users')
        .send(newUser)

        const result = await api
        .post('/api/login')
        .send(newUser)

        headers = {
        'Authorization': `bearer ${result.body.token}`
        }
    })
    test('new blog is created appropriately', async () => {  ///////////////////////////////

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
        .set(headers)
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
        .set(headers)
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
        .set(headers)

    })

    test('if token is missing, it must return status 401 Unauthorized', async() =>{
        const blogPrueba = {
            title:"Blog de Prueba sin token",
            author:"Mike",
            url:"https://pruebadeblog.com/",
            likes: 5
        }

        await api
        .post('/api/blogs')
        .send(blogPrueba)
        .expect(401)

    })

})

describe('deletion of a blog', () => {

    let headers

    beforeEach(async () => {
        await User.deleteMany({})
        const newUser = {
        username: 'root',
        name: 'root',
        password: 'password',
        }

        await api
        .post('/api/users')
        .send(newUser)

        const result = await api
        .post('/api/login')
        .send(newUser)

        headers = {
        'Authorization': `bearer ${result.body.token}`
        }
    })

    test('deletion succeeds with status code 204 if id is valid', async () => {
      
        const newBlog = {
            title:"Prueba de borrado",
            author:"Mike",
            url:"http://pruebadeborrado.html",
            likes:5
          }
        
        await api
        .post("/api/blogs")
        .send(newBlog)
        .set(headers)
        .expect(201)
      
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart.find(blog => blog.title === newBlog.title)
    
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .set(headers)
          .expect(204)
    
       
      const blogsAtEnd = await helper.blogsInDb()
      
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

      const contents = blogsAtEnd.map(r => r.title)
      assert(!contents.includes(blogToDelete.title))
    })
  })


  describe('updating of a blog', () => {
    let headers

    beforeEach(async () => {
        await User.deleteMany({})
        const newUser = {
        username: 'root',
        name: 'root',
        password: 'password',
        }

        await api
        .post('/api/users')
        .send(newUser)

        const result = await api
        .post('/api/login')
        .send(newUser)

        headers = {
        'Authorization': `bearer ${result.body.token}`
        }
    })
    test('update a blog successfull', async () => {
        const newBlog = {
            title:"Updating Blog",
            author:"Mike",
            url:"http://www.updatingblog.html",
            likes:12
          }
      
          await api
           .post('/api/blogs')
           .send(newBlog)
           .expect(201)
           .set(headers)
           .expect('Content-Type', /application\/json/)
          
          const allBlogs = await helper.blogsInDb()
          const blogToUpdate = allBlogs.find(blog => blog.title === newBlog.title)
      
          const updatedBlog = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1
          }
      
          await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)
            .set(headers)
            .expect('Content-Type', /application\/json/)
      
          const blogsAtEnd = await helper.blogsInDb()
          assert(blogsAtEnd.length === allBlogs.length)
          const foundBlog = blogsAtEnd.find(blog => blog.likes === 13)
          assert(foundBlog.likes ===13)
        })


    })


 

after(async () => {
  await mongoose.connection.close()
})