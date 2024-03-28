import React, { useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoginForm from "react-bootstrap/Form";
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
            <LoginForm.Group>
              <LoginForm.Label htmlFor="email">
                Bettor ID/ Email*
              </LoginForm.Label>
              <LoginForm.Control
                type="text"
                id="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={errors.email}
              />
              <LoginForm.Control.Feedback type="invalid">
                {errors.email}
              </LoginForm.Control.Feedback>
            </LoginForm.Group>

            <LoginForm.Group className="mt-2">
              <LoginForm.Label htmlFor="password">Password*</LoginForm.Label>
              <LoginForm.Control
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={errors.password}
              />
              <LoginForm.Control.Feedback type="invalid">
                {errors.password}
              </LoginForm.Control.Feedback>
            </LoginForm.Group>

            <LoginForm.Group className="mt-2">
              <button className="form-control">Login</button>
            </LoginForm.Group>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
