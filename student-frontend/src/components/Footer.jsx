import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <>

        <footer className="bg-dark text-light text-center py-4 mt-5">
        <p className="mb-0">
            &copy; {new Date().getFullYear()} Student Management System -
            <NavLink to="https://github.com/mithildhure" target="_blank" rel="noopener noreferrer"> Mithil Dhure</NavLink>
        </p>
        </footer>

    </>
  )
}

export default Footer
