import React, { useRef, useState } from "react";
import Card from "@/components/Card";
import PasswordField from "@/components/Form/PasswordField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { HttpClientCall } from "@/components/HTTPClient";
import { notify } from "@/components/Helper";
const ChangePassword = () => {
  const innerRef = useRef();
  const [initialValues, setinitialValues] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  // Validation schema
  const validationSchema = Yup.object({
    current_password: Yup.string().required("Current password required."),
    password: Yup.string()
      .min(6, "At least 6 characters required.")
      .required("New password required."),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords miss match")
      .min(6, "At least 6 characters required.")
      .required("Confirm password required."),
  });

  // Handle password changed
  const handlePasswordChange = async (values) => {
    try {
      const res = await HttpClientCall({
        method: "POST",
        endpoint: "change-password",
        includeAuth: true,
        data: values,
      });
      if (res?.code === 200) {
        notify("success", "Password change successfuly!");
        setinitialValues({
          current_password: "",
          password: "",
          password_confirmation: "",
        });
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
                        name="password"
                      />
                    </div>
                    <div className="col-md-12 mt-2">
                      <PasswordField
                        type="password"
                        label="Confirm password*"
                        name="password_confirmation"
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
};

export default ChangePassword;
