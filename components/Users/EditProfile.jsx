import { Form as FormikForm, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import InputField from "../Form/InputField";
import * as Yup from "yup";
import { getUserDetailsData } from "@/services/userAuthService";
import InputDateField from "../Form/InputDateField";
import { useUserData } from "../Context/UserDataProvider/UserProvider";
import { HttpClientCall } from "../HTTPClient";
import { notify } from "../Helper";
import ImageInputField from "../Form/ImageInputField";

const EditProfileForm = () => {
  const formikRef = useRef();
  const { userData } = useUserData();
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
    lastname: Yup.string().required("This field required").max(50),
    email: Yup.string().required("This field required").max(50),
    mobile: Yup.string().required("This field required").max(50),
    dob: Yup.string().nullable(),
    country_code: Yup.string().required("This field required").max(50),
    state: Yup.string().required("This field required").max(50),
    city: Yup.string().required("This field required").max(50),
    zip: Yup.string().required("This field required").max(50),
    address: Yup.string().required("This field required").max(50),
    occupation: Yup.string().required("This field required").max(50),
    image: Yup.mixed(),
  });

  const handleSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    try {
      const res = await HttpClientCall({
        method: "POST",
        endpoint: "user-profile-update",
        includeAuth: true,
        data: values,
      });
      if (res?.status) {
        notify("success", res?.user_message);
      } else if (res.response.status === 422) {
        Object.keys(res.response.data.errors).forEach((field) => {
          if (typeof res.response.data.errors[field] !== "string") {
            res.response.data.errors[field].forEach((errorMessage) => {
              notify("error", errorMessage);
            });
          } else {
            notify("error", res.response.data.errors[field]);
          }
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (userData) {
      setInitialValues({
        ...userData,
        ...userData?.address,
      });
      setUser(userData);
    }
  }, [userData]);

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
              <InputField label="Date of Birth" name="dob" />
            </div>
            <div className="col-md-3 mt-2">
              <InputDateField label="Country" name="country_code" disabled />
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
              <ImageInputField label="Image" type="file" name="image" />
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
