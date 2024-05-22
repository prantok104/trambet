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
import Loader from "../Loader";

const EditProfileForm = () => {
  const formikRef = useRef();
  const { userData, setUserProMuted } = useUserData();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
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
    image: null,
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
    address: Yup.string().required("This field required").max(255),
    occupation: Yup.string().nullable().max(50),
    // image: Yup.mixed(),
  });

  const handleSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    setLoading(true)
    try {
      const res = await HttpClientCall({
        method: "POST",
        endpoint: "user-profile-update",
        includeAuth: true,
        data: values,
        content_type: "multipart/form-data",
      });
      if (res?.status) {
        notify("success", res?.user_message);
        setUserProMuted((prevState) => !prevState);
        setLoading(false)
      } else if (res.response.status === 422) {
        Object.keys(res.response.data.errors).forEach((field) => {
          if (typeof res.response.data.errors[field] !== "string") {
            res.response.data.errors[field].forEach((errorMessage) => {
              notify("error", errorMessage);
              setLoading(false)
            });
          } else {
            notify("error", res.response.data.errors[field]);
            setLoading(false)
          }
        });
        setLoading(false)
      }
      
    } catch (error) {notify("error", error);setLoading(false);}
  };

  useEffect(() => {
    if (userData) {
      setInitialValues({
        firstname: userData?.firstname,
        lastname: userData?.lastname,
        email: userData?.email,
        mobile: userData?.mobile,
        dob: userData?.dob,
        country_code: userData?.country_code,
        state: userData?.address?.state,
        city: userData?.address?.city,
        zip: userData?.address?.zip,
        address: userData?.address?.address,
        occupation: userData?.occupation,
        image: null
      });
      setUser(userData);
    }
  }, [userData]);

  return loading ? (
    <Loader />
  ) : (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      className="form-data"
    >
      {({ values, touched, errors }) => (
        <FormikForm encType="multipart/form-data">
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
              <InputDateField
                label="Date of Birth"
                name="dob"
                disabled={user?.dob ? true : false}
              />
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
