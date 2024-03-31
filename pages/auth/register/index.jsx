import React from 'react'
import  RegisterForm from '@/components/Auth/Register'
const Register = () => {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div className="p-3 bg-shadow df-radius">
            <h6>Register your account</h6>
            <hr />
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register