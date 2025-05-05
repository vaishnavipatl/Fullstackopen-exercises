const express = require('express')
const app = express()
const userServices = require('../services/userServices')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

exports.register= async(req,res)=>{
    try{
        // console.log("Request Body:", req.body)
        const { name , email ,password}=req.body
        const response = await userServices.registerUser(name, email,password)
        
        if(response.status === 201){
            res.cookie('token' ,response.token , {
                httpOnly : true ,
                maxAge : 3600000 ,
            })
        }
        res.status(response.status).json(response)
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

exports.login=async(req,res)=>{
    try{
        const{email ,password}=req.body
        const response =await userServices.loginUser(email , password)
        
        if(response.status === 200){
            res.cookie('token' ,response.token , {
                httpOnly : true ,
                maxAge : 3600000 ,
            })
        }
        res.status(response.status).json(response)
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

exports.logout = async(req,res)=>{
    res.cookie('token' ,'')
}

