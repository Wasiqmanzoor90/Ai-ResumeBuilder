import axios from 'axios';
import { useState } from 'react'


function Login() {
  const [email, setEmai] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const data = {
      email,
      password
    };

    try {

      const res = await axios.post("http://localhost:4441/api/auth/", data)
      if (res) {
        localStorage.setItem("token", res.data.token)
          localStorage.setItem("UserId", res.data.user.id)
           console.log( res.data.message); 
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <input type="email" placeholder='email' onChange={(e) => setEmai(e.target.value)} value={email} />
      <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} value={password} />
      <button onClick={handleLogin}>Submit</button>
      <a href="/register">Dont have an account| signup</a>
    </div>


  )
}

export default Login
