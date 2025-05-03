const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title : {type : String , required :true},
    author : {type: mongoose.Schema.Types.ObjectId,ref:'User', required: true} ,
    content : {type: String, required: true} ,
    image: { data: Buffer , contentType : String },
    likes : [{type: mongoose.Schema.Types.ObjectId,ref:'User'}] ,
    comment : [{
        user:{type: mongoose.Schema.Types.ObjectId,ref:'User'},
        text:{type:String},
        createsAt :{type:Date , default:Date.now},
    }] ,
    views:{type:Number ,default:0}
    
},
{timestamps:true}
)

module.exports = mongoose.model('Blog' , blogSchema)

