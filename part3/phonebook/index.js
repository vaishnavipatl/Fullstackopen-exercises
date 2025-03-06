require('dotenv').config()
const express = require('express')

const morgan=require('morgan')
const cors=require('cors')


const phonebook = require('./models/phonebook')

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))


const handleerror=(error,req,res,next)=>{
  console.error(error.message)

  if(error.name === 'CastError'){
    return res.status(400).json({error:'Malformatted ID'})
  }else if(error.name === 'ValidtionError'){
    return res.status(400).json({error: error.message })
  }
  next(error)
}


const finalErrorHandler = (error, req, res, next) => {
  console.error('Unhandled Error:', error.message);
  res.status(500).json({ error: 'Something went wrong on the server' });
};


app.get('/api/person',async(req,res ,next)=>{
    let person = await phonebook.find({})
      .then(person =>{
        if(person){
          res.json(person)
        }
        else{
          res.status(404).end()
        }
      })
      .catch(error =>{
        next(error)
      })
     
})


app.post('/api/persons/add',async(req,res,next)=>{
    try{
      const {name ,number }= req.body
      const createcontact = await phonebook.create({
        name,
        number
    })
    res.status(201).json({ message: 'User created successfully',createcontact });
    }catch(error){
      next(error)
    }
})


app.delete('/api/persons/:id',async(req,res ,next)=>{
    const id =req.params.id
    await phonebook.findByIdAndDelete(id) 
    .then(persondeleted =>{
       if(!persondeleted){
        return res.status(404).json({message:"Contact not found"})
       }
       res.status(204).json({message:"successfully deleted"}).end()
    })
    .catch(error=>{
      next(error)
    })
 })


app.use(handleerror)
app.use(finalErrorHandler)

const PORT = 3001
app.listen(PORT ,()=>{
    console.log(`server running on port ${PORT}`);
    
})

