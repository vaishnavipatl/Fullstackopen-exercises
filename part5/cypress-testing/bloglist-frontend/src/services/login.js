import axios from "axios";
const baseURl = 'http://localhost:3001/api/users/login'

const login = async (email , password) =>{
    const credentials = { email, password }
    const response = await axios.post(baseURl , credentials , { withCredentials : true})
    return response.data
}

export default {login}