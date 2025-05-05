import axios from 'axios'
const baseurl="http://localhost:3001/api/blogs/comment"

const addcomment =async(blogId, text) =>{
  const credentials = {text}
  const comment = await axios.post(`${baseurl}/${blogId}` ,credentials ,{withCredentials :true ,headers:{"Content-Type":"application/json"}})
  console.log(comment.data)
  return comment.data
 
}

export default {addcomment}