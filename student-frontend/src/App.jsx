import { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentList from './components/StudentList'
import AddStudent from './components/AddStudent'
import EditStudent from './components/EditStudent'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

function App() {
 

  return (
    <>
      
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<StudentList/>} />
          <Route path='/addStudent' element={<AddStudent/>} />
          <Route path='/editStudent/:id' element={<EditStudent/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
