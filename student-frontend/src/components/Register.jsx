import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [user, setUser] = useState({
        "uName" : '',
        "username" : '',
        "email" : '',
        "password" : ''
    });
    const navigate = useNavigate();
    
    const handleChange = (e)=>{
        setUser({
            ...user, [e.target.name] : e.target.value
        });
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post(`http://localhost:8080/register`,user).then((result) => {
            setUser(result.data);
            navigate('/login');
        }).catch((err) => {
            alert('Failed to Register, Plz Try Again');
            console.log(err);
            
        });
    }

  return (
    <>
      
      <h3 className='text-center p-3 bg-dark text-success'>Welcome</h3>

      <div
        className="container col-5 my-4 p-3 bg-light rounded text-center"
      >
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>

            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="uName"
                    id="uame"
                    value={user.uName}
                    placeholder=""
                    onChange={handleChange}
                    required
                />
                <label htmlFor="uame">Name</label>
            </div>
            
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="uname"
                    value={user.username}
                    placeholder=""
                    onChange={handleChange}
                    required
                />
                <label htmlFor="uname">Username</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="uemail"
                    value={user.email}
                    placeholder=""
                    onChange={handleChange}
                    required
                />
                <label htmlFor="uemail">Email</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="pass"
                    value={user.password}
                    placeholder=""
                    onChange={handleChange}
                    required
                />
                <label htmlFor="pass">Password</label>
            </div>

            <button
                type="submit"
                className="btn btn-success"
            >
                Submit
            </button>
            
        </form>

      </div>
      

    </>
  )
}

export default Register
