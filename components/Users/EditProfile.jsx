import { Form as FormikForm, Formik } from 'formik'
import React, {useEffect, useRef, useState} from 'react'
import InputField from '../Form/InputField';
import * as Yup from 'yup';
import { getUserDetailsData } from '@/services/userAuthService';


const EditProfileForm = () => {
const formikRef = useRef();
 const validationSchema = Yup.object({
    fname: Yup.string().required("First name required").max(50),
    lname: Yup.string().required("Last name required").max(50),
  });
  const initialValues = {
    fname: "",
    lname: "",
  };
  const handleSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    console.log(values);
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
   if (localStorage.getItem("token")) {
     getUserDetailsData();
     const data = JSON.parse(localStorage.getItem("userDetails"));
     setUser(data);
   }
 }, []);

 const [firstname, setFirstname] = useState(user?.firstname);

 console.log(user)
  return (
    <Formik innerRef={formikRef} initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        className="form-data">
      {({ values,touched, errors }) => (
        <FormikForm>
          <div className="row">
               <div className="col-md-6">
                  <InputField label='First name*' value={user?.firstname}  name='fname' />
               </div>
               <div className="col-md-6">
                  <InputField label='Last name*' value={user?.lastname}  name='lname'  />
               </div>
               <div className="col-md-4 mt-2">
                  <InputField label='Email'  name='email' value={user?.email} disabled={(user?.email) ? true : false}  />
               </div>
               <div className="col-md-4 mt-2">
                  <InputField label='Phone'  name='mobile' value={user?.mobile} disabled={(user?.mobile) ? true : false}  />
               </div>
               <div className="col-md-4 mt-2">
                  <InputField label='Date of Birth' type='date'  name='dob' value={user?.dob} disabled={(user?.dob) ? true : false}  />
               </div>
               <div className="col-md-3 mt-2">
                  <InputField label='Country'   name='country' disabled value={user?.address?.country}  />
               </div>
               <div className="col-md-3 mt-2">
                  <InputField label='State*'   name='state' value={user?.address?.state}/>
               </div>
               <div className="col-md-3 mt-2">
                  <InputField label='City*'   name='city' value={user?.address?.city}/>
               </div>
               <div className="col-md-3 mt-2">
                  <InputField label='Zip*'   name='zip' value={user?.address?.zip}/>
               </div>
               <div className="col-md-4 mt-2">
                  <InputField label='Address*'  name='address' value={user?.address?.address}/>
               </div>
               <div className="col-md-4 mt-2">
                  <InputField label='Occupation'  name='occupation' />
               </div>
               <div className="col-md-4 mt-2">
                  <InputField label='Image' type="file"  name='image' />
               </div>
               <div className="col-md-3">
                  <button type="submit" className="logout-btn">UPDATE</button>
               </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}

export default EditProfileForm