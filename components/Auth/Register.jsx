import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import React, { use, useEffect, useRef, useState } from "react";
import InputField from "../Form/InputField";
import CheckboxField from "../Form/CheckboxField";
import SelectField from "../Form/SelectField2";
import Link from "next/link";
import { HttpClientCall } from "../HTTPClient";
import { getCountryList, getCurrencyList } from "../../services/common";
import { notify } from "../Helper";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import HookFormInputField from "../Form/HookFormInputFiled";
import HookFormSearchField from "../Form/HookFormSearchField";
import HookFormCheckField from "../Form/HookFormCheckField";
import Loader from "../Loader";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").max(100),
    country: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string().required()
    }),
    mobile: Yup.string().required("Mobile is required").max(50),
    currency: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string().required()
    }),
    promo: Yup.string().max(50),
    password: Yup.string().required("Password is required").max(50),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .max(50),
    agree: Yup.boolean().required("Agree is required"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      country: "",
      mobile: "",
      currency: "",
      promo: "",
      password: "",
      confirm_password: "",
      agree: false,
    },
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, formState: { errors } } = form;

  const [countryList, setCountryList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);

  async function countryData() {
    const data = await getCountryList();
    setCountryList(data);
  }

  async function currencyData() {
    const data = await getCurrencyList();
    setCurrencyList(data);
  }

  useEffect(() => {
    countryData();
    currencyData();
  }, []);

  const router = useRouter();
  const onSubmit = async (values) => {
    setIsLoading(true)
    const data = {
      ...values,
      country: values?.country?.value,
      currency: values?.currency?.value,
    }
    // console.log("🚀 ~ Register ~ values:", data)
    // return



    HttpClientCall({
      method: "POST",
      endpoint: "signup",
      includeAuth: false,
      data: data,
    }).then((res) => {
      setIsLoading(false)
      if (res.status === true) {
        localStorage.setItem("token", res.access_token);
        if (res.data.ev == 0) {
          toast.success("Successfully Registration completed", {
            onClose: () => router.push("/user/otp-verify"),
          });
        } else {
          toast.success("Successfully Registration completed", {
            onClose: () => router.push("/"),
          });
        }
      } else if (res.response.status === 422) {
        Object.keys(res.response.data.errors).forEach((field) => {
          res.response.data.errors[field].forEach((errorMessage) => {
            notify("error", errorMessage);
          });
        });
      } else {
        notify("error", res.response.data.message);
      }
    });
  };

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <HookFormInputField
              label="Email*"
              name="email"
              error={errors.email}
            />
          </div>
          <div className="col-md-6">
            <HookFormSearchField
              label="Country*"
              name="country"
              options={countryList}

              labelField="name"
              valueField="dial_code"
              error={errors.country}
            />
          </div>
          <div className="col-md-6 mt-2">
            <HookFormInputField
              label="Mobile*"
              name="mobile"
              error={errors.mobile}
            />
          </div>
          <div className="col-md-6 mt-2">
            <HookFormSearchField
              label="Currency*"
              name="currency"
              options={currencyList}
              labelField="name"
              valueField="code"
              error={errors.country}
            />
          </div>
          <div className="col-md-12 mt-2">
            <HookFormInputField
              label="promo (Optional)*"
              name="mobile"
              error={errors.promo}
            />
          </div>
          <div className="col-md-6 mt-2">
            <HookFormInputField
              label="Password*"
              name="password"
              error={errors.password}
            />
          </div>
          <div className="col-md-6 mt-2">
            <HookFormInputField
              label="Confirm Password*"
              name="confirm_password"
              error={errors.confirm_password}
            />
          </div>
          <div className="col-md-12 mt-2 d-flex gap-2 align-items-center">
            <HookFormCheckField name="agree" error={errors.agree} />
            <div className="bottom-register">
              I agree with <Link href={"/policy/privacy-policy"}>Privacy Policy</Link>,{" "}
              <Link href={"/policy/terms-of-service"}>Terms of Service</Link>,
              <Link href={"/policy/refund-policy"}> Refund Policy</Link>
            </div>
          </div>
          <div className="col-md-6 mt-2 mb-4">
            <button type="submit" className="df-btn df-radius reg-btn" style={{ background: `${form.watch("agree") ? "linear-gradient(70deg, #31bc69 -8%, #089e4e 96%)" : "gray"}`, cursor: `${form.watch("agree") ? '' : "not-allowed"}` }}>
              Registration now  {isLoading && <Loader />}
            </button>
          </div>
          <hr />
          <div className="col-md-12 mt-1 bottom-register">
            <h6 className="text-center">
              Are you want to quickly registration?{" "}
              <Link href={"/auth/one-click"}>Click here</Link>
            </h6>
          </div>
          <div className="col-md-12 mt-2 bottom-register">
            <h6 className="text-center">
              {" "}
              Already have an account? Please{" "}
              <Link href={"/auth/login"}>Login</Link> here.
            </h6>
          </div>
          <div className="col-md-12 mt-1 bottom-register">
            <h6 className="text-center">
              <Link href={"/auth/register/affiliate"}>Became an affiliate</Link>
            </h6>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Register;
