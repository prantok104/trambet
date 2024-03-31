import { Form as FormikForm, Formik } from 'formik'
import React, {useRef} from 'react'
import InputField from '../Form/InputField';
import * as Yup from 'yup';


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
  return (
    <Formik innerRef={formikRef} initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        class="form-data">
      {({ values,touched, errors }) => (
        <FormikForm>
          <div className="row">
               <div className="col-md-6">
                  <InputField label='First name*'  name='fname' />
               </div>
               <div className="col-md-6">
                  <InputField label='Last name*'  name='lname'  />
               </div>
               <div className="col-md-4 mt-2">
                  <InputField label='Email'  name='email' value="email@example.com" disabled  />
               </div>
               <div className="col-md-4 mt-2">
                  <InputField label='Phone'  name='mobile' value="+8801745474574" disabled  />
               </div>
               <div className="col-md-4 mt-2">
                  <InputField label='Date of Birth' type='date'  name='dob' disabled  />
               </div>
               <div className="col-md-3 mt-2">
                  <InputField label='Country'   name='country' disabled value="Bangladesh"  />
               </div>
               <div className="col-md-3 mt-2">
                  <InputField label='State*'   name='state'  />
               </div>
               <div className="col-md-3 mt-2">
                  <InputField label='City*'   name='city'  />
               </div>
               <div className="col-md-3 mt-2">
                  <InputField label='Zip*'   name='zip'  />
               </div>
               <div className="col-md-4 mt-2">
                  <InputField label='Address*'  name='address'  />
               </div>
               <div className="col-md-4 mt-2">
                  <InputField label='Occupation'  name='occupation'  />
               </div>
               <div className="col-md-4 mt-2">
                  <InputField label='Image' type="file"  name='image'  />
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