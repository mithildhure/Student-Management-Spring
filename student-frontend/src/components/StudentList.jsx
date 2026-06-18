import React, { useEffect, useState } from 'react'
import { NavLink ,useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// RAFC -> react arrow function component

const StudentList = () => {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
  axios.get(`http://localhost:8080/students/fetchAll`).then((result) => {
    setStudents(result.data);
    setLoading(false);
  }).catch((err) => {
    console.log('Failed to Fetch Data',err);
    setLoading(false);
  });
},[]);

const handleDelete = (id)=>{
  if (window.confirm('Are You sure u want to delete This Student?')) {
    axios.delete(`http://localhost:8080/students/delete?id=${id}`).then(() => {
      setStudents(students.filter(s => s.id !== id))
      navigate('/');
  }).catch((err) => {
    console.log('Failed to Delete',err);
  });
  }
}

  if (loading) {
    return(
      <div className="container text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
    )
  }

  return (
    <>

      <div
        className="container my-4 p-2"
      >

       <h2 className='text-center my-2 p-2'>Student List</h2>

       <div
        className="container text-end"
       >
        
        <NavLink
        className=" btn btn-success my-2"
        to="/addStudent"
        role="button"
        >Add Student</NavLink>
      
       </div>
       

        <div
          className="table-responsive rounded"
        >
          <table
            className="table table-hover"
          >
            <thead className='table-dark'>
              <tr>
                <th >Student Id</th>
                <th >First Name</th>
                <th >Last Name</th>
                <th >Student Age</th>
                <th >Standard</th>
                <th >Student Fees</th>
                <th >Action</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead >
            <tbody>
              
              {students.map((student)=>{
               return<tr key={student.id}>
                <td >{student.id}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{student.age}</td>
                <td>{student.standard}</td>
                <td>{student.fees}</td>
                <td>
                  <NavLink
                      className="btn btn-warning"
                      to={`/editStudent/${student.id}`}
                      role="button"
                      >Edit</NavLink>
                      </td>

                  <td>
                      <button
                      className="btn btn-danger"
                      role="button"
                      onClick={()=>{handleDelete(student.id)}}
                      >Delete</button>
                  </td>
              </tr>

              })}

            </tbody>
          </table>
        </div>
        

      </div>
      

    </>
  )
}

export default StudentList
