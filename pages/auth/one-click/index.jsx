import React from 'react'
import  OneClickRegisterForm from '@/components/Auth/OneClick'
const OneClickRegister = () => {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div className="p-3 bg-shadow df-radius">
            <h6>Register your account</h6>
            <hr />
            <OneClickRegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OneClickRegister