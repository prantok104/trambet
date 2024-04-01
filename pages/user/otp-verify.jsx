import React from 'react'
import OTPInputGroup from '@/components/Auth/Otp/otpInputs'
import Card from '@/components/Card'
const OtpVerify = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <Card >
            <div className="text-center pt-5">
              <h5 className="text-white mb-2">OTP Verification</h5>
              <p className="mb-2">Enter the verification code. we just send to your email. </p>
              <p className="mb-3">Please type your 6 digits security code</p>
            </div>
            <OTPInputGroup />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify