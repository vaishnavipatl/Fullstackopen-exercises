import axios from 'axios'
const BASEURL = 'http://localhost:3001/api/users/logout'

const logout = async()=>{
    axios.post(BASEURL , {} , {withCredentials:true})
}


export default {logout}