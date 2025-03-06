require('dotenv').config();
const mongoose =require('mongoose')

mongoose.set('strictQuery' ,false)

const url=process.env.MONGODB_URL
console.log(url);

mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting:', err));

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: {
    type: String,
    required:true,
    validate :{
      validator: function(v){
        return /^\d{2,3}-\d+$/.text(v) && v.length == 10      }
    },
    message: props => `${props.value} is not a valid phone number! It should be in the format XX-XXXXXXX or XXX-XXXXXXXX and at least 8 characters long.`
  },  
}, { versionKey: false });

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Phonebook', phonebookSchema);