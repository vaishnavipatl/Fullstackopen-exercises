import React, { useState } from "react";


const Register = ({handleRegister}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); 
    
    try{
      const response= await handleRegister(name,email,password)
      setMessage(response.message || "Registration Successful")
    }catch(error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={({target}) => setName(target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={({target}) => setEmail(target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={({target}) => setPassword(target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;