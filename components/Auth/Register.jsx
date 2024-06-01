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
import LoaderPage from "@/pages/LoaderPage";
import Loader from "../Loader";
import { useUserData } from "../Context/UserDataProvider/UserProvider";
import Cookies from "js-cookie";

const Register = () => {
  const router = useRouter();
  console.log(router);
  const { handleUserData } = useUserData();
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
  const [promo, setPromo] = useState('');
  const [agree, setAgree] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [isCountryLoading, setIsCountryLoading] = useState(false);
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false);
  const [loading, setLoading] = useState(false)

  async function countryData() {
    setIsCountryLoading(true);
    await HttpClientCall({
      endpoint: "country",
      method: "GET",
      includeAuth: false,
      data: [],
    })
      .then((response) => {
        setIsCountryLoading(false);
        setCountryList(response.data);
      })
      .catch((error) => {
        return [];
      });
  }

  async function currencyData() {
    setIsCurrencyLoading(true);
    await HttpClientCall({
      endpoint: "currency",
      method: "GET",
      includeAuth: false,
      data: [],
    })
      .then((response) => {
        setIsCurrencyLoading(false);
        setCurrencyList(response.data?.map((item) => {
          return {
            name: item?.code, 
            code: item?.code
          }
        }));
      })
      .catch((error) => {
        return [];
      });
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

  const handleSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    setLoading(true)
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
      country:
        countryName.length && countryName[0].name ? countryName[0].name : null,
      reference: router?.query?.reference,
    };
    HttpClientCall({
      method: "POST",
      endpoint: "signup",
      includeAuth: false,
      data: data,
    }).then((res) => {
      setLoading(false)
      if (res.status === true) {
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("token", res.access_token);
        Cookies.set("token", res.access_token, { expires: 1 / 24 });
        handleUserData();
        if (res.data.ev == 0) {
          toast.success("Successfully Registration completed");
        } else {
          toast.success("Successfully Registration completed");
        }
        router.replace("/user/otp-verify");
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
      } else {
        notify("error", res.response.data.message);
      }
    });
  };


  return (
    <>
      {isCountryLoading || isCountryLoading || loading ? <Loader /> : ""}
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
                  <button
                    disabled={!values?.agree}
                    style={{
                      background: `${
                        values?.agree
                          ? "linear-gradient(70deg, #31bc69 -8%, #089e4e 96%)"
                          : "gray"
                      }`,
                      cursor: `${values?.agree ? "" : "not-allowed"}`,
                    }}
                    type="submit"
                    className="df-btn df-radius reg-btn"
                  >
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
                    <Link href={"/auth/register/affiliate"}>
                      Became an affiliate
                    </Link>
                  </h6>
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default Register;
