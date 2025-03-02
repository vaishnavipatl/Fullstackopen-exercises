const express = require('express')
const morgan=require('morgan')
const cors=require('cors')

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/info',(req,res)=>{
    const date = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
    
})

app.get('/api/persons/:id',(req,res)=>{
   const id =req.params.id
    res.json(persons.find(person=>person.id === id))
})
app.post('/api/persons/add',(req,res)=>{
    const {name ,number }= req.body
    const newId = Math.max(...persons.map(user=>user.id))+1
    const newPersons ={
        id: newId,
        name,
        number
    }
    persons.push(newPersons)
    res.status(201).json({ message: 'User created successfully', newPersons });
})
app.delete('/api/persons/:id',(req,res)=>{
    const id =req.params.id
    const userindex= persons.findIndex(person=>person.id === id)
    persons.splice(userindex ,1)
    res.json({message:"successfully deleted"})
 })
 

const PORT = 3001
app.listen(PORT ,()=>{
    console.log(`server running on port ${PORT}`);
    
})