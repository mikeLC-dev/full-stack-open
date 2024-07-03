const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const { usersInDb } = require('../tests/test_helper')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
      
  })
  
blogsRouter.post('/', async (request, response,next) => {

    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    console.log("USUARIOOOOOO",user)
    const blog = new Blog({
      title: body.title,
      author: user.name,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if(!blog.likes){
      blog.likes = 0
    }

    try{
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog.toJSON())
    } catch(exception) {
      next(exception)
    }
     
  })


  blogsRouter.delete('/:id', async (request, response,next) => {
    const id = request.params.id.toString()
    
    try{
      await Blog.findByIdAndDelete(id)
      response.status(204).end()
    } catch (exception){
      next(exception)
    }

  })

  blogsRouter.put('/:id', async (request, response,next) => {
    const id = request.params.id.toString()
    const body = request.body
    const blogToUpdate = await Blog.findById(id)
      const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
      }


    try{
      const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true })
      logger.info(`blog ${newBlog.title} successfully updated`)
      response.json(updatedBlog.toJSON())
      
    } catch(exception){
      next(exception)
    }



  })

  module.exports = blogsRouter