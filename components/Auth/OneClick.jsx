import { Form as FormikForm, Formik } from 'formik'
import React, {useRef} from 'react'
import InputField from '../Form/InputField';
import CheckboxField from "../Form/CheckboxField";
import SelectField from "../Form/SelectField";
import Link from 'next/link'
import * as Yup from 'yup';
const OneClickRegister = () => {
   const formikRef = useRef();
   const validationSchema = Yup.object({
      email: Yup.string().required("Email is required").max(100),
      country: Yup.string().required("Country is required").max(50),
   });
   const initialValues = {
      email: "",
      country: "bn",
   };
   const handleSubmit = async (
      values,
      { setErrors, setStatus, setSubmitting }
   ) => {
      console.log(values);
   };


  const countries = [{label: "---Select country---" , value: ""}, {label: "Bangladesh" , value: "bn"}, {label: "India", value: 'in'}];
  const currency = [{label: "BDT" , value: "BDT"}, {label: "INR", value: 'INR'}];
  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      className="form-data"
    >
      {({ values, touched, errors }) => (
        <FormikForm>
          <div className="row">
            <div className="col-md-6">
              <SelectField
                label="Country*"
                name="country"
                options={countries}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                label="Currency*"
                name="currency"
                options={currency}
              />
            </div>
            <div className="col-md-12 mt-2">
              <InputField label="Promo (Optional)" name="promo" />
            </div>
            <div className="col-md-12 mt-2 d-flex gap-2 align-items-center">
              <CheckboxField name="agree" />
              <div className='bottom-register'>
                I agree with <Link href={"/"}>Privacy Policy</Link>,{" "}
                <Link href={"/"}>Terms of Service</Link>,
                <Link href={"/"}> Refund Policy</Link>
              </div>
            </div>
            <div className="col-md-6 mt-2 mb-4">
              <button className="df-btn df-radius reg-btn">
                Registration now
              </button>
            </div>
             <hr/>
            <div className="col-md-12 mt-1 bottom-register">
              <h6 className="text-center">
                 Are you want to full registration? <Link href={"/auth/register"}>Click here</Link>
              </h6>
            </div>
            <div className="col-md-12 mt-2 bottom-register">
              <h6 className="text-center">
                {" "}
                Already have an account? Please <Link href={"/auth/login"}>
                  Login
                </Link>{" "}
                here.
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
        </FormikForm>
      )}
    </Formik>
  );
}

export default OneClickRegister