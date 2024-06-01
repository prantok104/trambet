"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import AffiliatLayout from "../../layout";
import {
  getAffiliateCreateFormData,
  getAffiliateDetails
} from "@/services/affiliate";
import { notify } from "@/components/Helper";
import SelectField from "@/components/Form/SelectField";
import InputField from "@/components/Form/InputField";
import { Button } from "react-bootstrap";
import Loader from "@/components/Loader";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
const AffiliateFullReport = () => {
  const innerRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [datePicker, setDatePicker] = useState('');
  // Generate link
  const effectLink = useCallback(async () => {
    await fetchLink();
  }, []);
  const fetchLink = async () => {
    setLoader(true);
    const responseData = await getAffiliateCreateFormData();
    if (responseData?.status == true) {
      setFormData(responseData);
      setLoader(false);
    } else {
      setLoader(false);
      notify("error", responseData?.data?.error);
    }
  };
  useEffect(() => {
    effectLink();
  }, [effectLink]);

  // Data fetch
  const effect = useCallback(async () => {
    await fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const responseData = await getAffiliateDetails();

    if (responseData?.status == true) {
      setData(responseData?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      notify("error", responseData?.data?.error);
    }
  };

  useEffect(() => {
    effect();
  }, [effect]);


  const generateInit = {
    website: "",
    currency: "",
    marketingId: "",
  };
  const generateValid = Yup.object({});
  const handleOnApply = (event, picker) =>{
    const start_date = picker.startDate.format("MM/DD/YYYY");
    const end_date = picker.endDate.format("MM/DD/YYYY");
    setDatePicker(`${start_date} - ${end_date}`);
  }
  const handleGenerateLink = async (values) => {
    setIsLoading(true);
    const responseData = await getAffiliateDetails({...values, dates:datePicker});
    if (responseData?.status) {
      notify("success", "Report generated");
      setIsLoading(false);
      setData(responseData?.data);
    } else {
      setIsLoading(false);
      notify("error", responseData?.data?.error);
    }
  };

  return (
    <AffiliatLayout>
      <div className="container-fluid">
        <Breadcrumb
          title="Affiliate Full Report"
          path="Home => affiliate => report => affiliate full report"
        />
        <div className="mt-2">
          <Card header={"Generate Affiliate Full Report"}>
            <Formik
              innerRef={innerRef}
              initialValues={generateInit}
              validationSchema={generateValid}
              enableReinitialize
              onSubmit={handleGenerateLink}
            >
              {() => (
                <FormikForm>
                  {loader ? (
                    <Loader />
                  ) : (
                    <div className="row">
                      <div className="col-md-4">
                        <SelectField
                          name="website"
                          options={[
                            { label: "Choose Website", value: "" },
                            ...formData?.data?.websites?.map((item) => ({
                              label: item?.website,
                              value: `${item?.website}`,
                            })),
                          ]}
                          label={"Website*"}
                        />
                      </div>
                      <div className="col-md-4">
                        <SelectField
                          name="currency"
                          options={[
                            { label: "Choose currency", value: "" },
                            ...formData?.data?.currency?.map((item) => ({
                              label: item?.currency_code,
                              value: item?.currency_code,
                            })),
                          ]}
                          label={"Currency*"}
                        />
                      </div>
                      <div className="col-md-4">
                        <InputField
                          name="marketingId"
                          label={"Marketing tool ID"}
                        />
                      </div>
                      <div className="col-md-4">
                        <DateRangePicker onApply={handleOnApply}>
                          <input
                            style={{
                              width: "100%",
                              height: "33px",
                              background: "#1E263C",
                              color: "#ccc",
                              marginTop: "20px",
                              border: "1px solid #888",
                              outline: "none",
                            }}
                          />
                        </DateRangePicker>
                      </div>
                      <div className="col-md-3 mt-3">
                        <Button type="submit" className="df-btn df-bg mt-1">
                          Generate Full Report
                        </Button>
                      </div>
                    </div>
                  )}
                </FormikForm>
              )}
            </Formik>
          </Card>
        </div>

        <div className="mt-2">
          <Card header="">
            {isLoading ? (
              <Loader />
            ) : (
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Website ID</th>
                    <th scope="col">Website</th>
                    <th scope="col">Registrations</th>
                    <th scope="col">New depositors</th>
                    <th scope="col">Total deposit amount</th>
                    <th scope="col">Bonus Amount</th>
                    <th scope="col">Company Profit</th>
                    <th scope="col">Commission amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((data, index) => (
                    <tr key={index} className="text-center">
                      <td>{++index}</td>
                      <td>{data?.website_id}</td>
                      <td>{data?.website}</td>
                      <td>{data?.registrations}</td>
                      <td>{data?.new_depositors}</td>
                      <td>{data?.total_deposit_amount}</td>
                      <td>{data?.bonus_amount}</td>
                      <td className="text-danger">{`${data?.company_profit_prefix}${data?.company_profit}`}</td>
                      <td className="text-success">{`${data?.commission_amount_prefix}${data?.commission_amount}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </div>
      </div>
    </AffiliatLayout>
  );
};

export default AffiliateFullReport;
