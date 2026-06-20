import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
// Navlink is used with classNameName not className!!

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        navigate('/login');
    }
  return (
    <>
      
       <nav
        className="navbar navbar-expand-xl navbar-dark bg-dark"
       >
        <div className="container">
            <NavLink className="navbar-brand" to="/">Student</NavLink>
            <button
                className="navbar-toggler d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" aria-current="page">Home</NavLink>
                    </li>
                    {user && (
                        <li className="nav-item">
                        {/* <NavLink className="nav-link" to="/">Link</NavLink> */}
                        <NavLink className='nav-link' to="/">Welcome {user.uName}</NavLink>
                    </li>
                    )}
                </ul>

                {
                    user && (
                        <button
                            type="button"
                            className="btn btn-outline-danger mx-2"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>                        
                    )
                }
            </div>
        </div>
       </nav>
       

    </>
  )
}

export default Navbar
