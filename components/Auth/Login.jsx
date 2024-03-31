import React, { useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from '../Form/InputField';
import CheckboxField from "../Form/CheckboxField";
import Link from 'next/link'
const LoginPage = () => {
  const formikRef = useRef();
  const validationSchema = Yup.object({
    email: Yup.string().required("Bettor ID/ Email is required").max(100),
    password: Yup.string().required("password is required"),
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    console.log(values);
  };
  return (
    <div>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        class="form-data"
      >
        {({ handleSubmit, handleChange, values, touched, focused, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <div className="row">
            <div className="col-md-12">
              <InputField label="Email*" name="email" />
            </div>
            
            <div className="col-md-12 mt-2">
              <InputField
                label="Password*"
                type="password"
                name="password"
              />
            </div>
            
            <div className="col-md-12 mt-2 d-flex gap-2 align-items-center  justify-content-between bottom-register">
              <div className='bottom-register d-flex align-items-center gap-2'>
              <CheckboxField name="agree" />
                Remember me?
              </div>
              <div className='bottom-register'>
               <Link href={'/'}>Forgot password?</Link>
              </div>
            </div>
            <div className="col-md-12 mt-2 mb-4">
              <button className="df-btn df-radius form-control reg-btn" style={{background: 'linear-gradient(70deg, #31bc69 -8%, #089e4e 96%)'}}>
                Login
              </button>
            </div>
             <hr/>
            <div className="col-md-12 mt-1 bottom-register">
              <h6 className="text-center">
                Don't have account? <Link href={"/auth/register"}>Create Account</Link>
              </h6>
            </div>
            <div className="col-md-12 mt-1 bottom-register">
              <h6 className="text-center">
                Are you want to quickly registration? <Link href={"/auth/one-click"}>Click here</Link>
              </h6>
            </div>
            <div className="col-md-12 mt-1 bottom-register">
              <h6 className="text-center">
                <Link href={"/"}>
                  Became an affiliate
                </Link>
              </h6>
            </div>
          </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
