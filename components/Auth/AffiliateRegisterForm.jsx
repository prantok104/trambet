import { Formik, Form as FormikForm } from 'formik';
import React, { useRef } from 'react'
import * as Yup from 'yup';
import InputField from '../Form/InputField';
import SelectField from '../Form/SelectField';
import Link from 'next/link';
import CheckboxField from '../Form/CheckboxField';

const AffiliateRegisterForm = () => {
   const innerRef = useRef();
   const initialValues = {
     email: "",
     country: "",
     mobile: "",
     currency: "",
     password: "",
     confirm_password: '',
     agree: ''
   };

   const validationSchema = Yup.object({
     email: Yup.string().email('Should contain a valid e-mail.').required("Email is required").max(100),
     country: Yup.string().required("Country is required").max(50),
     mobile: Yup.string().required("Mobile is required").max(50),
     currency: Yup.string().required("Currency is required").max(50),
     password: Yup.string().required("Password is required").max(50),
     confirm_password: Yup.string()
       .required("Confirm password is required")
       .max(50),
     agree: Yup.string().required(" "),
   });

   const handleSubmit = (values) => {
      console.log(values)
     // add extra field pass with payload is_affiliate = 1 and endpoint same as full registration process
   }
  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      className="form-data"
    >
      {({ values, errors }) => (
        <FormikForm>
          <div className="row">
            {JSON.stringify(errors)}
            <div className="col-md-6">
              <InputField label="Email*" name="email" />
            </div>
            <div className="col-md-6">
              <SelectField label="Country*" name="country" options={[]} />
            </div>
            <div className="col-md-6 mt-2">
              <InputField label="Mobile*" name="mobile" />
            </div>
            <div className="col-md-6 mt-2">
              <SelectField label="Currency*" name="currency" options={[]} />
            </div>
            <div className="col-md-6 mt-2">
              <InputField label="Password*" type="password" name="password" />
            </div>
            <div className="col-md-6 mt-2">
              <InputField
                label="Confirm Password*"
                type="password"
                name="confirm_password"
              />
            </div>
            <div className="col-md-12 mt-2 d-flex gap-2 align-items-center">
              <CheckboxField  name="agree" />
              <div className="bottom-register">
                I agree with{" "}
                <Link href={"/policy/privacy-policy"}>Privacy Policy</Link>,{" "}
                <Link href={"/policy/terms-of-service"}>Terms of Service</Link>,
                <Link href={"/policy/refund-policy"}> Refund Policy</Link>
              </div>
            </div>
            <div className="col-md-6 mt-2 mb-4">
              <button type="submit" className="df-btn df-radius reg-btn">
                Registration now
              </button>
            </div>
            <hr />
            <div className="col-md-12 mt-1 bottom-register">
              <h6 className="text-center">
                Are you want to quickly registration?{" "}
                <Link href={"/auth/one-click"}>Click here</Link>
              </h6>
            </div>
            <div className="col-md-12 mt-2 bottom-register">
              <h6 className="text-center">
                {" "}
                Already have an account? Please{" "}
                <Link href={"/auth/login"}>Login</Link> here.
              </h6>
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}

export default AffiliateRegisterForm