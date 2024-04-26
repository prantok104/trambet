import Card from '@/components/Card'
import InputField from '@/components/Form/InputField'
import PasswordField from '@/components/Form/PasswordField'
import { Form, Formik } from 'formik'
import React, { useRef } from 'react'
import * as Yup from 'yup'
const ChangePassword = () => {
   const innerRef = useRef();

   // Initial vales
   const initialValues = {
      current_password: '',
      new_password: '',
      confirm_password: ''
   }

   // Validation schema
   const validationSchema = Yup.object({
     current_password: Yup.string().required("Current password required."),
     new_password: Yup.string()
       .min(6, "At least 6 characters required.")
       .required("New password required."),
     confirm_password: Yup.string()
       .oneOf([Yup.ref("new_password"), null], "Passwords miss match")
       .min(6, "At least 6 characters required.")
       .required("Confirm password required."),
   });

   // Handle password changed
   const handlePasswordChange  = (values) => {
      console.log(values);
   }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 mx-auto">
          <Card header={"Change password"}>
            <Formik
              innerRef={innerRef}
              validationSchema={validationSchema}
              initialValues={initialValues}
              enableReinitialize={true}
              onSubmit={handlePasswordChange}
            >
              {({ values }) => (
                <Form>
                  <div className="row">
                    <div className="col-md-12">
                      <PasswordField
                        type="password"
                        label="Current password*"
                        name="current_password"
                      />
                    </div>
                    <div className="col-md-12 mt-2">
                      <PasswordField
                        type="password"
                        label="New password*"
                        name="new_password"
                      />
                    </div>
                    <div className="col-md-12 mt-2">
                      <PasswordField
                        type="password"
                        label="Confirm password*"
                        name="confirm_password"
                      />
                    </div>
                    <div className="col-md-12 mt-2">
                      <button className="df-btn df-bg df-border">
                        Change Password
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword