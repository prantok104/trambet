import { Formik, Form } from "formik";
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

const OneClickRegister = () => {
  const [country, setCountry] = useState("BD");
  const [curr, setCurrency] = useState("BDT");
  const [promo, setPromo] = useState("");
  const [agree, setAgree] = useState();
  const [countryList, setCountryList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    HttpClientCall({
      method: "GET",
      endpoint: "country",
      includeAuth: false,
      data: {},
    }).then((res) => {
      setCountryList(res.data);
    });

    HttpClientCall({
      method: "GET",
      endpoint: "currency",
      includeAuth: false,
      data: {},
    }).then((res) => {
      setCurrencyList(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      if (res.status === true) {
        localStorage.setItem("token", res.access_token);
        //redirect to home page 
        
        toast.success("Successfully Registration completed", {
          onClose: () => window.location.assign('/'),
      });
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


  return (
    <Formik enableReinitialize={true} className="form-data">
      <Form noValidate onSubmit={handleSubmit}>
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
            <button type="submit" className="df-btn df-radius reg-btn">
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
              <Link href={"/"}>Became an affiliate</Link>
            </h6>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default OneClickRegister;
