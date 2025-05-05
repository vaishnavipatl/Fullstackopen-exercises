import { useState } from "react";
const LoginForm = ({handleLogin}) => {
      const [email , setEmail]=useState('')
      const [password , setPassword]= useState('')
      const[message ,setMessage]=useState('')
      
      const handleSubmit = async (event)=>{
          event.preventDefault()
          setMessage("")
          try {
            const response = await handleLogin(email , password)
            setMessage(response.message || "Login successful")
          } catch (error) {
            setMessage(error.response?.data?.message || "Login failed")
          }
          
        }
      
    return (
      <div id="LoginForm">
        {message && <p>{message}</p>}
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Email:
            <input id='Email' value={email} onChange={({target})=>setEmail(target.value)}/>
          </div>
          <div>
            Password:
            <input id="password" type="password" value={password} onChange={({target})=>setPassword(target.value)}/>
          </div>
          <button id="login-button" type="submit">Sign in</button>
        </form>
      </div>
    );
  };
  
  export default LoginForm;
