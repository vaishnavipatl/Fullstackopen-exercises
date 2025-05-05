import axios from "axios"
const baseurl = "http://localhost:3001/api/users/register"


const register= async(name , email , password)=>{
   const credentials = {name , email , password}
   const response = await axios.post(baseurl , credentials , {withCredentials : true , headers: { "Content-Type": "application/json" }})
   
   console.log(response.data)
   return response.data
}


export default {register}