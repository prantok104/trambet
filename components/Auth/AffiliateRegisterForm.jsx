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

const AffiliateRegisterForm = () => {
  
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").max(100),
    country: Yup.string().required("Country is required").max(50),
    mobile: Yup.string().required("Mobile is required").max(50),
    currency: Yup.string().required("Currency is required").max(50),
    promo: Yup.string().max(50),
    password: Yup.string().required("Password is required").max(50),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .max(50),
    agree: Yup.boolean().required("Agree is required"),
  });

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("BD");
  const [curr, setCurrency] = useState("BDT");
  const [promo, setPromo] = useState("");
  const [agree, setAgree] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  const initialValues = {
    email: email,
    country: country,
    mobile: mobile,
    currency: curr,
    promo: promo,
    password: password,
    confirm_password: confirmPassword,
    agree: agree,
  };
  useEffect(() => {
    countryData();
    currencyData();
  }, []);

  const router = useRouter();
  const handleSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    const countryName = countryList.filter((item) => item.code === country);
    const data = {
      email: email,
      country_code: country,
      mobile: mobile,
      mobile_code: countryName[0].dial_code,
      currencies: curr,
      promo: promo,
      password: password,
      password_confirmation: confirmPassword,
      agree: agree,
      is_affiliate : 1,
      country:
        countryName.length && countryName[0].name ? countryName[0].name : null,
    };
    HttpClientCall({
      method: "POST",
      endpoint: "signup",
      includeAuth: false,
      data: data,
    }).then((res) => {
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
          res.response?.data?.errors[field]?.forEach((errorMessage) => {
            notify("error", errorMessage);
          });
        });
      } else {
        notify("error", res.response.data.message);
      }
    });
  };

  return (
    <Formik
      // innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      className="form-data"
    >
      {({ values, touched, errors }) => {
        return (
          (
            <FormikForm>
              <div className="row">
                <div className="col-md-6">
                  <InputField
                    label="Email*"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <SelectField
                    label="Country*"
                    name="country"
                    options={countryList}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <InputField
                    label="Mobile*"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <SelectField
                    label="Currency*"
                    name="currency"
                    options={currencyList}
                    value={curr}
                    onChange={(e) => setCurrency(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <InputField
                    label="Promo (Optional)"
                    name="promo"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <InputField
                    label="Password*"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <InputField
                    label="Confirm Password*"
                    type="password"
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mt-2 d-flex gap-2 align-items-center">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <div className="bottom-register">
                    I agree with <Link href={"/"}>Privacy Policy</Link>,{" "}
                    <Link href={"/"}>Terms of Service</Link>,
                    <Link href={"/"}> Refund Policy</Link>
                  </div>
                </div>
                <div className="col-md-6 mt-2 mb-4">
                  <button disabled={!values?.agree} style={{ background: `${values?.agree ? "linear-gradient(70deg, #31bc69 -8%, #089e4e 96%)" : "gray"}`, cursor: `${values?.agree ? "" : "not-allowed"}` }} type="submit" className="df-btn df-radius reg-btn">
                    Registration now 
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
            </FormikForm>
          )
        )
      }}
    </Formik>
  );
}

export default AffiliateRegisterForm