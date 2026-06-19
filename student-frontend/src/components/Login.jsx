import React from 'react'

const Login = () => {
  return (
    <>
      
      <h2 className='bg-dark text-primary text-center p-4'> Welcome </h2>

      <div
        className="container my-4 p-3 col-5 text-center bg-light rounded"
      >
            <h3 className='text-center p-3'>Login</h3>
        <form >

            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="uname"
                    placeholder=""
                />
                <label htmlFor="uname">Username</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="pass"
                    placeholder=""
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

      </div>
      

    </>
  )
}

export default Login
