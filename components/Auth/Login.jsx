import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "../Form/InputField2";
import CheckboxField from "../Form/CheckboxField";
import Link from "next/link";
import ConstantData from "../ConstantData";
import Swal from "sweetalert2";
import { HttpClientCall } from "../HTTPClient";

const schema = Yup.object().shape({
  email: Yup.string().required("UserId or Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await HttpClientCall({
        method: "POST",
        endpoint: "login",
        includeAuth: false,
        data: data,
      });

      if (res.status) {
        localStorage.setItem("token", res.access_token);
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "You have successfully logged in",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      } else if (res.response.status === 422) {
        console.log(res.response.data.errors);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: `${res.response.data.user_message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-12">
            <InputField
              label="UserId or Email*"
              name="email"
              register={register}
              error={errors.email}
            />
          </div>

          <div className="col-md-12 mt-2">
            <InputField
              label="Password*"
              type="password"
              name="password"
              register={register}
              error={errors.password}
            />
          </div>

          <div className="col-md-12 mt-2 d-flex gap-2 align-items-center justify-content-between bottom-register">
            <div className="bottom-register d-flex align-items-center gap-2">
              <CheckboxField name="agree" register={register} />
              Remember me?
            </div>
            <div className="bottom-register">
              <Link href={"/user/reset-password"}>Forgot password?</Link>
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
              Don't have account? <Link href={"/auth/register"}>Create Account</Link>
            </h6>
          </div>
          <div className="col-md-12 mt-1 bottom-register">
            <h6 className="text-center">
              Are you want to quickly registration? <Link href={"/auth/one-click"}>Click here</Link>
            </h6>
          </div>
          <div className="col-md-12 mt-1 bottom-register">
            <h6 className="text-center">
              <Link href={"/"}>Become an affiliate</Link>
            </h6>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
