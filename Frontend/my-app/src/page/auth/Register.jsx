
import axios from 'axios';
import React, { useState } from 'react'

function Register() {
    const [name, setName] = useState("")
    const [email, setEmai] = useState("");
    const [password, setPassword] = useState("")

    const handleRegister = async () => {
        const data = {
            name,
            email,
            password
        }

        try {
            const res = await axios.post("http://localhost:4441/api/auth/register", data)
            if (res) {
                console.log(res.data.message);
                window.location.href('/');
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <input type="text" placeholder='Enter  name' onChange={(e) => setName(e.target.value)} value={name} />
            <input type="email" placeholder='enter email' onChange={(e) => setEmai(e.target.value)} value={email} />
            <input type="password" placeholder='enter password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handleRegister}>Submit</button>
        </div>
    )
}

export default Register
