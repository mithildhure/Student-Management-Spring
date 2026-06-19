import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {

    const [student, setStudent] = useState({
        "firstname" : '',
        "lastname" : '',
        "age" : '',
        "standard" : '',
        "fees" : ''
    });
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submit, setSubmit] = useState(false);

    useEffect(()=>{
        axios.get(`http://localhost:8080/students/fetch/${id}`).then((result) => {
            setStudent(result.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            alert("failed to load student data");
        });;
    },[id]);

    const handleChange = (e)=>{
        setStudent({...student, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setSubmit(true);

        const payload = {
        ...student,
        age : parseInt(student.age),
        standard: parseInt(student.standard),
        fees: parseFloat(student.fees)
    }

        axios.put(`http://localhost:8080/students/update?id=${id}`,payload).then((result) => {
            setSubmit(false);
            navigate('/');
        }).catch((err) => {
            setSubmit(false);
            console.log(err);
            alert('Failed to edit student');
        });
    }

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

  return (
    <>
      
      <div
        className="container my-3 p-2 col-5 bg-light rounded"
      >
       <h3 className='text-center p-2 my-3'>Edit Student</h3> 
        <form onSubmit={handleSubmit}>

        <div className="form-floating mb-3">
            <input
                type="text"
                className="form-control"
                name="firstname"
                value={student.firstname}
                onChange={handleChange}
                required
            />
            <label>First Name</label>
        </div>
        
        <div className="form-floating mb-3">
            <input
                type="text"
                className="form-control"
                name="lastname"
                value={student.lastname}
                onChange={handleChange}
                required
            />
            <label >Last Name</label>
        </div>

        <div className="form-floating mb-3">
            <input
                type="number"
                className="form-control"
                name="age"
                value={student.age}
                onChange={handleChange}
                required
            />
            <label >Age</label>
        </div>

        <div className="form-floating mb-3">
            <input
                type="number"
                className="form-control"
                name="standard"
                value={student.standard}
                onChange={handleChange}
                required
            />
            <label >Standard</label>
        </div>

        <div className="form-floating mb-3">
            <input
                type="number"
                className="form-control"
                name="fees"
                value={student.fees}
                onChange={handleChange}
                required
            />
            <label >Fees</label>
        </div>

        <button
            type="submit"
            className="btn btn-success mx-2"
            disabled={submit}
        >
            {submit ? 'Updating...' : 'Update'}
        </button>

        <button
                type="button"
                className="btn btn-secondary"
                onClick={()=>{navigate('/')}}
                disabled={submit}
            >
                Back
            </button>

        </form>

      </div>
      

    </>
  )
}

export default EditStudent
