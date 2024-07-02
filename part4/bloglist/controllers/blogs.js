const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
      
  })
  
blogsRouter.post('/', async (request, response,next) => {

    const body = request.body

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      
    })

    if(!blog.likes){
      blog.likes = 0
    }

    try{
      const savedBlog = await blog.save()
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