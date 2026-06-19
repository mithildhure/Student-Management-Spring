import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {

    const [student, setStudent] = useState({"firstname":'',"lastname":'',"age":'',"standard":'',"fees":''});
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);

    const handleChange = (e)=>{
        setStudent({
            ...student,[e.target.name] : e.target.value
        });
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        setStudent(true);

         const payload = {
            ...student,
            age: parseInt(student.age),
            standard: parseInt(student.standard),
            fees: parseFloat(student.fees)
        };

        axios.post(`http://localhost:8080/students/save`,payload).then((result) => {
            setStudent(false);
            navigate('/');
        }).catch((err) => {
            console.log(err);
            setSubmit(false);
            alert('Failed to Add Student')
        });
    }

  return (
    <>

    <div
        className="container col-5 my-4 p-3 bg-light rounded"
    >
        <h3 text-center p-2 my-2>Add Student</h3>
        <form onSubmit={handleSubmit}>

            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    id="formId1"
                    placeholder=""
                    value={student.firstname}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="formId1">First Name</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    id="formId1"
                    placeholder=""
                    value={student.lastname}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="formId1">Last Name</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="number"
                    className="form-control"
                    name="age"
                    id="formId1"
                    placeholder=""
                    value={student.age}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="formId1">Age</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="number"
                    className="form-control"
                    name="standard"
                    id="formId1"
                    placeholder=""
                    value={student.standard}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="formId1">Standard</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="number"
                    className="form-control"
                    name="fees"
                    id="formId1"
                    placeholder=""
                    value={student.fees}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="formId1">Fees</label>
            </div>

            <button
                type="submit"
                className="btn btn-success mx-2"
                disabled={submit}
            >
                {submit ? 'Saving...' : 'Submit'}
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

export default AddStudent
