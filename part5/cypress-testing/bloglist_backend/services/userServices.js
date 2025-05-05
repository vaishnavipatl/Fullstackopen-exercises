const User = require('../models/userdata')
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.registerUser = async(name , email , password)=>{
   try{ const userExist= await User.findOne({email})
    if(userExist) return {status: 400 ,message:'User Already Exists'}
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt)

    const user = new User({
        name ,
        email,
        password:hashedPassword
    })
    await user.save()
    const token = jwt.sign({email:user.email , userid: user._id},process.env.JWT_SECRET , {expiresIn : '1h'})
    return { status: 201, message: 'User is created', token , user }
}catch(error){
    throw new Error("Something went wrong while registering user")
}
}

exports.loginUser = async(email ,password)=>{
   try{
     
    const userExist = await User.findOne({email})
     if(!userExist) return {status: 400 ,message:'User Is Not Exists'}
    
     const result = await bcrypt.compare(password , userExist.password)
     if (!result) return { status: 401, message: 'Incorrect password' }
       if(result){
        const token = jwt.sign({email : userExist.email , userid : userExist._id} , process.env.JWT_SECRET ,{expiresIn : '1h'})
        return { status : 200 , message:'User logged in Sucessfully' , token ,userExist}
       }
     
    }catch(error){
        throw new Error ("Something went wrong")
    }
}

