import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import Swal from "sweetalert2";
import { HttpClientCall } from "../HTTPClient";
import HookFormInputFiled from "../Form/HookFormInputFiled";
import HookFormCheckField from "../Form/HookFormCheckField";
import Loader from "../Loader";
import { getUserDetailsData } from "@/services/userAuthService";
import Cookies from "js-cookie";
import { useUserData } from "../Context/UserDataProvider/UserProvider";

const LoginPage = ({ setLoginModal }) => {
  const { handleUserData } = useUserData()
  const [isLoading, setIsLoading] = useState(false)
  const schema = Yup.object().shape({
    username: Yup.string().required("UserId or Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      agree: false
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState: { errors } } = form;

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const res = await HttpClientCall({
        method: "POST",
        endpoint: "login",
        includeAuth: false,
        data: data,
      });

      if (res.status) {
        setIsLoading(false)
        Cookies.set("token", res.access_token)
        localStorage.setItem("token", res.access_token);
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "You have successfully logged in",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          handleUserData(res?.data)
          if (setLoginModal) {
            setLoginModal(false);
          }
          getUserDetailsData();
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
    <FormProvider {...form}>
      <div>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-12">
              <HookFormInputFiled
                label="UserId or Email*"
                name="username"
                error={errors.username}
              />
            </div>

            <div className="col-md-12 mt-2">
              <HookFormInputFiled
                label="Password*"
                type="password"
                name="password"
                error={errors.password}
              />
            </div>

            <div className="col-md-12 mt-2 d-flex gap-2 align-items-center justify-content-between bottom-register">
              <div className="bottom-register d-flex align-items-center gap-2">
                <HookFormCheckField name="agree" error={errors.agree} />
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
                style={{ background: "linear-gradient(70deg, #31bc69 -8%, #089e4e 96%)" }}
              >
                Login {isLoading && <Loader />}
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
                <Link href={"/"}>Became an affiliate</Link>
              </h6>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default LoginPage;
