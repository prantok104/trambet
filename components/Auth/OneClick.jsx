import { Form as FormikForm, Formik } from "formik";
import React, { useEffect, useState } from "react";
import InputField from "../Form/InputField2";
import CheckboxField from "../Form/CheckboxField";
import SelectField from "../Form/SelectField2";
import Link from "next/link";
import { HttpClientCall } from "../HTTPClient";
import Form2 from "react-bootstrap/Form";
import { notify } from "@/components/Helper";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Loader from "../Loader";
import { useUserData } from "../Context/UserDataProvider/UserProvider";
import Cookies from "js-cookie";
import { getUserDetailsData } from "@/services/userAuthService";
import { Modal } from "react-bootstrap";

const OneClickRegister = () => {
  const { setShowOneClickModal, handleUserData, handleOneClickModal, showOneClickModal, userData } = useUserData()
  const validationSchema = Yup.object({
    country: Yup.string().required("Country is required").max(50),
    currency: Yup.string().required("Currency is required").max(50),
    promo: Yup.string().max(50),
    agree: Yup.boolean().required("Agree is required"),
  });

  const [country, setCountry] = useState("BD");
  const [curr, setCurrency] = useState("BDT");
  const [promo, setPromo] = useState("");
  const [agree, setAgree] = useState();
  const [countryList, setCountryList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [isCountryLoading, setIsCountryLoading] = useState(false)
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false)

  const router = useRouter();

  const initialValues = {
    country: country,
    currency: curr,
    promo: promo,
    agree: agree,
  };


  async function countryData() {
    setIsCountryLoading(true)
    await HttpClientCall({
      endpoint: "country",
      method: "GET",
      includeAuth: false,
      data: [],
    }).then((response) => {
      setIsCountryLoading(false)
      setCountryList(response.data);
    }).catch((error) => {
      return [];
    });
  }

  async function currencyData() {
    setIsCurrencyLoading(true)
    await HttpClientCall({
      endpoint: "country",
      method: "GET",
      includeAuth: false,
      data: [],
    }).then((response) => {
      setIsCurrencyLoading(false)
      setCurrencyList(response.data);
    }).catch((error) => {
      return [];
    });

  }

  useEffect(() => {
    countryData();
    currencyData();
  }, []);


  const handleSubmit = async (values) => {
    // console.log(values);
    // return
    const countryName = countryList.filter((item) => item.code === country);
    const data = {
      country_code: country,
      currencies: curr,
      promo: promo,
      agree: agree,
      country: countryName.length && countryName[0].name ? countryName[0].name : null,
    };

    HttpClientCall({
      method: "POST",
      endpoint: "oneclick-signup",
      includeAuth: false,
      data: data,
    }).then((res) => {
      if (res.status) {
        handleOneClickModal(true)
        localStorage.setItem("userDetails", JSON.stringify(res?.data));
        Cookies.set("token", res.access_token)
        localStorage.setItem("token", res.access_token);
        toast.success("Successfully Registration completed");
        handleUserData(res?.data)
      } else if (res.response.status === 422) {
        Object.keys(res.response.data.errors).forEach((field) => {
          res.response.data.errors[field].forEach((errorMessage) => {
            notify("error", errorMessage);
          });
        });
      } else {
        notify("error", "User registration failed");
      }
    });
  };

  let content = ""
  if (isCountryLoading || isCurrencyLoading) {
    content = <Loader />
  } else {
    content = <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      className="form-data">
      {({ values, touched, errors }) => {
        return (
          (
            <FormikForm>
              <div className="row">
                <div className="col-md-6">
                  <SelectField
                    label="Country*"
                    name="country"
                    options={countryList}
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  />
                </div>
                <div className="col-md-6">
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
                <div className="col-md-12 mt-2 d-flex gap-2 align-items-center">
                  <Form2.Check
                    type="checkbox"
                    name="agree"
                    value={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    required
                    feedbackType="invalid"
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
                    Are you want to full registration?{" "}
                    <Link href={"/auth/register"}>Click here</Link>
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
  }

  return (
    <>
      {content}
      {/* Login page area start */}
      <Modal
        show={showOneClickModal}
        onHide={() => {
          setShowOneClickModal(false)
          router.push("/")
        }}
        backdrop="static"
        keyboard={false}
        className="login-page"
      >
        <Modal.Header closeButton>
          <Modal.Title>One Click User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Please Save this for your future use</h5>
          <h5 className="fw-bold my-2">Password: {userData?.one_time_pass}</h5>
          <h5 className="fw-bold">User Id: {userData?.user_id}</h5>
        </Modal.Body>
      </Modal>
      {/* Login page area end */}
    </>
  );
};

export default OneClickRegister;
