const blogServices = require ('../services/blogServices')

exports.newBlog = async(req,res)=>{
  try {
    const{title ,content}=req.body
    const image = req.file
    const author = req.user.userid
    // console.log("REQ.BODY:", req.body);
    // console.log("REQ.FILE:", req.file);
    // console.log("REQ.USER:", req.user);
   
    const response = await blogServices.createblog(title ,content , image,author)
    if(response.status === 201){
    res.status(response.status).json(response)

  }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

exports.allBlog = async(req, res)=>{
  try{
   const response = await blogServices.retriveBlog()
   if(response.status===200){
    res.status(200).json(response.blog)
   }
  }catch(error){
    res.status(400).json(error.message)
  }
}

  exports.likeblog=async(req,res)=>{
    try {
      const userId=req.user.userid
      const blogId=req.params.id
      const response = await blogServices.likeBlog(blogId,userId)
      if(response.status===200){
        res.status(200).json(response)
      }
    } catch (error) {
      res.status(400).json(error.message)
    }
  }

exports.addcomment=async(req,res)=>{
  try {
    const userId = req.user.userid
    const blogId = req.params.id
    const{text}=req.body
    const response = await blogServices.addComment(blogId,userId ,text)
    res.status(response.status).json(response)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

exports.blogDelete=async(req,res)=>{
  try {
    const blogId =req.params.id
    const response = await blogServices.remove(blogId)
    res.status(response.status).json(response)
  } catch (error) {
    res.status(400).json(error.message)
  }
}
