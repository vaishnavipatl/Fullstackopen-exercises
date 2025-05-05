//blogservice.js
const { Error } = require("mongoose")
const Blog = require("../models/blogdata")

exports.createblog=async(title,content,image ,author)=>{
    try {
       const blog = new Blog({
        title ,
        content,
        author : author ,
        image: image
        ? {
            data: image.buffer,
            contentType: image.mimetype,
        }
        : undefined,
        
       })
       await blog.save()
       return{status:201 , message:"Blog is posted sucessfully" , blog}
    } catch (error) {
        throw new Error ("There is problem for creating blog")
    }
}

exports.retriveBlog=async()=>{
    try {
       const blog = await Blog.find().populate('author' ,'name _id')
       const blogWithBase64=blog.map(blog=>{
        const blogObject = blog._doc
        return{
            ...blogObject,
            image:blog.image?.data 
            ?{
                contentType: blog.image.contentType,
                data: blog.image.data.toString('base64')
            }
            : null
        } 

       })
       return{status :200 , blog:blogWithBase64}
    } catch (error) {
    throw new Error('There is no blog available') 
    }
}

exports.likeBlog=async(blogId ,userId)=>{
 try {
    const blog=await Blog.findById(blogId)
    const isLiked=blog.likes.includes(userId)
    if(isLiked){
        blog.likes.pull(userId)
    }
    else{
        blog.likes.push(userId)
    }
    await blog.save()
    return{status:200 ,message:'Likes status updated' ,blog}
 } catch (error) {
    throw new Error('Like status cannot be update')
 }
}

exports.addComment=async(blogId,userId ,text)=>{
    try{
    const blog = await Blog.findById(blogId)
    const newComment = {
        user:userId ,
        text:text
    }
    blog.comment.push(newComment)
    await blog.save()
    return{ status:201 ,message:'commented',comment:newComment}
    }catch(error){
        throw new Error('You cannot be Comment')
    }
}

exports.remove=async (blogId) => {
    try {
        await Blog.findByIdAndDelete(blogId)
        return{ status:200 , message: "Blog deleted successfully" }
    } catch (error) {
        throw new Error('You cannot delete this blog')
        
    }
}