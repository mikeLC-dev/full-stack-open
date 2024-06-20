const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://miguellozanocobos:${password}@cluster0.xg1jmuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)


const personSchema = new mongoose.Schema({
    id: Number,
    name: String, 
    number: Number
  })
  
  const Person = mongoose.model('Person', personSchema)
  
  if(process.argv[3] && process.argv[4]){

    const newPerson = new Person({
        id: Math.floor(Math.random()*10000),
        name: process.argv[3],
        number: process.argv[4]
      })
      
      newPerson.save().then(() => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
      })
  }else{
    Person.find({}).then(result => {
        console.log("phonebook")
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
  }

  