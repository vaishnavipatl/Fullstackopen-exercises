import axios from "axios"
const baseurl = "http://localhost:3001/api/blogs/newBlog"


const newblog = async(title,content,image)=>{
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

   const response = await axios.post(baseurl , formData , {withCredentials : true , headers: {"Content-Type": "multipart/form-data"}})
  
   
   console.log(response.data)
   return response.data
}


export default {newblog}

