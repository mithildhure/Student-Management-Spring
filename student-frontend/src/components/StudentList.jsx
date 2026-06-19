import React, { useEffect, useState } from 'react'
import { NavLink ,useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// RAFC -> react arrow function component

const StudentList = () => {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize] = useState(10);
  const navigate = useNavigate();

  const fetchPage = async (page) => {
    setLoading(true);
    try {
      const respone = await axios.get(`http://localhost:8080/students/fetchPage`,{
        params : {
          pageNumber:page,
          pageS :pageSize
        }
      });
      setStudents(respone.data.content);
      setTotalPage(respone.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
        console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchPage(0);
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

const goToPage = (page)=>{
    if(page >= 0 && page < totalPage){
        fetchPage(page);
    }
}

const goToPrev = ()=>{
  goToPage(currentPage - 1);
}

const goToNext = ()=>{
  goToPage(currentPage + 1);
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
              
              {students.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No students found</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
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
                    >
                      Edit
                    </NavLink>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}

            </tbody>
          </table>
        </div>
        
          {totalPage > 0 && (
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToPrev} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>

            {[...Array(totalPage).keys()].map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => goToPage(page)}>
                  {page + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPage - 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToNext} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
          

      </div>
      

    </>
  )
}

export default StudentList
