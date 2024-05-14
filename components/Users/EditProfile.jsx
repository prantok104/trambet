import { Form as FormikForm, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import InputField from "../Form/InputField";
import * as Yup from "yup";
import { getUserDetailsData } from "@/services/userAuthService";
import InputDateField from "../Form/InputDateField";

const EditProfileForm = () => {
  const formikRef = useRef();
  const [user, setUser] = useState(null);
  const [initialValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    dob: "",
    country_code: "",
    state: "",
    city: "",
    zip: "",
    address: "",
    occupation: "",
    attachments: [],
  });

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name required").max(50),
    lastname: Yup.string().required("Last name required").max(50),
    email: Yup.string().required("Last name required").max(50),
    mobile: Yup.string().required("Last name required").max(50),
    dob: Yup.string().required("Last name required").max(50),
    country_code: Yup.string().required("Last name required").max(50),
    state: Yup.string().required("Last name required").max(50),
    city: Yup.string().required("Last name required").max(50),
    zip: Yup.string().required("Last name required").max(50),
    address: Yup.string().required("Last name required").max(50),
    occupation: Yup.string().required("Last name required").max(50),
    attachments: Yup.array(),
  });

  const handleSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
   // need update api
    console.log(values);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserDetailsData();
      const data = JSON.parse(localStorage.getItem("userDetails"));
      setInitialValues({
        ...data,
        address: data?.address?.address,
      });
      setUser(data);
    }
  }, []);

  const [firstname, setFirstname] = useState(user?.firstname);

  // console.log(user)
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
              <InputField label="First name*" name="firstname" />
            </div>
            <div className="col-md-6">
              <InputField label="Last name*" name="lastname" />
            </div>
            <div className="col-md-4 mt-2">
              <InputField
                label="Email"
                name="email"
                disabled={user?.email ? true : false}
              />
            </div>
            <div className="col-md-4 mt-2">
              <InputField
                label="Phone"
                name="mobile"
                disabled={user?.mobile ? true : false}
              />
            </div>
            <div className="col-md-4 mt-2">
              <InputDateField label="Date of Birth" type="date" name="dob" />
            </div>
            <div className="col-md-3 mt-2">
              <InputField label="Country" name="country_code" disabled />
            </div>
            <div className="col-md-3 mt-2">
              <InputField label="State*" name="state" />
            </div>
            <div className="col-md-3 mt-2">
              <InputField label="City*" name="city" />
            </div>
            <div className="col-md-3 mt-2">
              <InputField label="Zip*" name="zip" />
            </div>
            <div className="col-md-4 mt-2">
              <InputField label="Address*" name="address" />
            </div>
            <div className="col-md-4 mt-2">
              <InputField label="Occupation" name="occupation" />
            </div>
            <div className="col-md-4 mt-2">
              <InputField label="Image" type="file" name="image" />
            </div>
            <div className="col-md-3">
              <button type="submit" className="logout-btn">
                UPDATE
              </button>
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default EditProfileForm;
