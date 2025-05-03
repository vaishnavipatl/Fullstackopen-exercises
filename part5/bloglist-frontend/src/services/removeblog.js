import axios from 'axios'
const baseurl="http://localhost:3001/api/blogs/delete"

const deleteblog = async (blogId) => {
    const removeblog =await axios.delete(`${baseurl}/${blogId}` ,{withCredentials:true})
    console.log(removeblog.data)
}

export default {deleteblog}