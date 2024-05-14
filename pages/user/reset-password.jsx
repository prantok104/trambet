import Card from '@/components/Card'
import InputField from '@/components/Form/InputField';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import { Button } from 'react-bootstrap';
import * as Yup from 'yup'
const ResetPassword = () => {
   const innerRef = useRef();
   const navigate = useRouter();
   const initialValues = {
      username: ''
   }
   const validationSchema = Yup.object({
      username: Yup.string().required('Username or Email field is required.')
   });
   
   const handleRecovery = (values) => {
      // console.log(values);
      navigate.push({
         pathname: '/user/recovery-password',
         query: {
            token: "sdfksdfskdjfksdjfknsdnsdjfsdfk"
         }
      })
   }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <Card header={"Account Recovery"}>
            <div className='mb-3'>
              Please provide your email or username to find your account.
            </div>
            <Formik innerRef={innerRef} initialValues={initialValues} validationSchema={validationSchema} enableReinitialize onSubmit={handleRecovery}>
               {() => (
                  <Form>
                     <div className="row">
                        <div className="col-md-12">
                           <InputField name="username" label="Username or Email*" placeholder="Bettor ID / Email" />
                        </div>
                        <div className="col-md-12 mt-3">
                           <Button type="submit" className='df-btn df-bg'>Submit</Button>
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

export default ResetPassword