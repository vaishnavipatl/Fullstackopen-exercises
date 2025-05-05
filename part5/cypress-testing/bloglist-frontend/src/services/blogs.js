

import axios from "axios"
const baseurl = "http://localhost:3001/api/blogs/getAllBlog"

const getAll = async() =>{
   const response = await axios.get(baseurl , { withCredentials: true })
   return response.data
}

export default {getAll}
