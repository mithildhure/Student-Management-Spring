import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {

    const [user, setUser] = useState({
        "username":'',
        "password":''
    });
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setUser({
            ...user,[e.target.name] : e.target.value 
        });
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post(`http://localhost:8080/login`, user).then((result) => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(result.data));
            navigate('/')
        }).catch((err) => {
            alert('Wrong Username or password');
            console.log(err);
        });
    }

  return (
    <>
      
      <h2 className='bg-dark text-primary text-center p-4'> Welcome </h2>

      <div
        className="container my-4 p-3 col-5 text-center bg-light rounded"
      >
            <h3 className='text-center p-3'>Login</h3>
        <form onSubmit={handleSubmit}>

            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={user.username}
                    id="uname"
                    placeholder=""
                    onChange={handleChange}
                />
                <label htmlFor="uname">Username</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={user.password}
                    id="pass"
                    placeholder=""
                    onChange={handleChange}
                />
                <label htmlFor="pass">Password</label>
            </div>  

            <button
                type="submit"
                className="btn btn-success"
            >
                Login
            </button>
                                  

        </form>

        <h4 className='my-3'>New User ? <NavLink className='text-primary' to='/register'>Register</NavLink> </h4>

      </div>
    

    </>
  )
}

export default Login
