import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../Form/InputField";
import CheckboxField from "../Form/CheckboxField";
import Link from "next/link";
import axios from "axios";
import ConstantData from "../ConstantData";
import Swal from "sweetalert2";
import { HttpClientCall } from "../HTTPClient";
const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const baseUrl = ConstantData.API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    HttpClientCall({
      method: "POST",
      endpoint: "login",
      includeAuth: false,
      data: data,
    }).then((res) => {
        if (res.status == true) {
          localStorage.setItem("token", res.access_token);
          Swal.fire({
            icon: "success",
            title: "Login Success",
            text: "You have successfully logged in",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setUserName("");
            setPassword("");
            // window.location.reload();
          });
        }else if (res.response.status == 422) {
          setError(error.data.errors);
        }
      }).catch((error) => {
        console.log(error);
        // if (error.response.status == 422) {
        //   setError(error.data.errors);
        // } else {
        //   Swal.fire({
        //     icon: "error",
        //     title: "Login Failed",
        //     text: `${error.data.user_message}`,
        //     showConfirmButton: false,
        //     timer: 1500,
        //   });
        // }
      });
  };
  return (
    <div>
      <Formik
        // innerRef={formikRef}
        // initialValues={initialValues}
        // validationSchema={error}
        // onSubmit={handleSubmit}
        enableReinitialize={true}
        className="form-data"
      >
        {/* {({ handleSubmit, handleChange, values, touched, focused, errors }) => ( */}
        <Form noValidate onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <InputField
                label="UserId or Email*"
                name="email"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                errorMessage={error.username ? error.username.join(" ") : null}
              />
            </div>

            <div className="col-md-12 mt-2">
              <InputField
                label="Password*"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                errorMessage={error.password ? error.password.join(" ") : null}
              />
            </div>

            <div className="col-md-12 mt-2 d-flex gap-2 align-items-center  justify-content-between bottom-register">
              <div className="bottom-register d-flex align-items-center gap-2">
                <CheckboxField name="agree" />
                Remember me?
              </div>
              <div className="bottom-register">
                <Link href={"/"}>Forgot password?</Link>
              </div>
            </div>
            <div className="col-md-12 mt-2 mb-4">
              <button
                type="submit"
                className="df-btn df-radius form-control reg-btn"
                style={{
                  background:
                    "linear-gradient(70deg, #31bc69 -8%, #089e4e 96%)",
                }}
              >
                Login
              </button>
            </div>
            <hr />
            <div className="col-md-12 mt-1 bottom-register">
              <h6 className="text-center">
                Don't have account?{" "}
                <Link href={"/auth/register"}>Create Account</Link>
              </h6>
            </div>
            <div className="col-md-12 mt-1 bottom-register">
              <h6 className="text-center">
                Are you want to quickly registration?{" "}
                <Link href={"/auth/one-click"}>Click here</Link>
              </h6>
            </div>
            <div className="col-md-12 mt-1 bottom-register">
              <h6 className="text-center">
                <Link href={"/"}>Became an affiliate</Link>
              </h6>
            </div>
          </div>
        </Form>
        {/* )} */}
      </Formik>
    </div>
  );
};

export default LoginPage;
