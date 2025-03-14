import mongoose, { Schema, model } from 'mongoose'

const userSchema = new Schema({
    name : String ,
    username : String,
    password : String,
    blog :[{
        type: Schema.Types.ObjectId,
        ref :'Blog'
    }]
})

 export default model('User' , userSchema)
