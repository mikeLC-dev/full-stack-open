const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')



usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users)
  })



usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const usernameIsUsed = await User.findOne({username : username}).exec()

  
  if(!username || !password){
    response.status(400).json({ error: 'You need provide username and password' })
  } else if(usernameIsUsed != null){
    response.status(400).json({ error: 'This username is already used' })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  }
  
})

module.exports = usersRouter