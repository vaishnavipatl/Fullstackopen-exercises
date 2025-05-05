import axios from "axios"
const baseurl = "http://localhost:3001/api/blogs/like"

const totalLikes= async(blogId)=>{
    
    const response = await axios.patch(`${baseurl}/${blogId}` ,{} , {withCredentials : true })
    
    console.log(response.data)
    return response.data
 }
 
 
 export default {totalLikes}