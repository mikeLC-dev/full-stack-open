const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))
app.use(cors())
app.use(morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    
    response.json(persons)
  })

  app.post('/api/persons', (request, response) => {
    
    
    const newId = Math.floor(Math.random()*10000)
    const body = request.body
    const nameAlreadyExists = persons.find((person)=>person.name === body.name) 
    
    console.log("nombre:",body.name)
    console.log("nmero:",body.number)
    
    if (!body.name) {
        return response.status(400).json({ 
          error: 'No se puede dejar vacío el campo nombre' 
        })
    } else if (!body.number || body.number <=0){
        return response.status(400).json({ 
            error: 'No se puede dejar vacío el campo número' 
          })
    } else if(nameAlreadyExists){
        return response.status(400).json({ 
            error: 'El nombre ya existe en la agenda' 
          })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: newId
    }
    
    persons = persons.concat(person)
    response.json(person)
    
    
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person=>person.id === id)
    if(!person){
        response.status(404).end()
    } else{
        response.json(person)
    }
    
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
    
  })

  app.get('/api/info', (request, response) => {
    const entries = persons.length
    response.send(`<p>Phonebook has info for ${entries} people</p>
                   <p>${new Date()}<p/>`
    )
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })