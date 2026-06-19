import { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentList from './components/StudentList'
import AddStudent from './components/AddStudent'
import EditStudent from './components/EditStudent'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Layout from './components/Layout'
import Login from './components/Login'
// import Footer from './components/footer'

function App() {
 

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
              <Route path='/' element={<StudentList/>} />
              <Route path='/addStudent' element={<AddStudent/>} />
              <Route path='/editStudent/:id' element={<EditStudent/>} />
          </Route>

          <Route path='/login' element={<Login/>} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>

    </>
  )
}

export default App
