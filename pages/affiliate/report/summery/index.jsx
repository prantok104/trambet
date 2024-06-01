import React, {useState, useRef, useEffect, useCallback} from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import InputField from "@/components/Form/InputField";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import AffiliatLayout from "../../layout";
import {
  getAffiliateCreateFormData,
  getAffiliateSummery,
} from "@/services/affiliate";
import { notify } from "@/components/Helper";
import SelectField from "@/components/Form/SelectField";
import { Button } from "react-bootstrap";
import Loader from "@/components/Loader";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

const Summery = () => {
  const innerRef = useRef();
  const [summeryData, setSummeryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [datePicker, setDatePicker] = useState("");
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      await getAffiliateSummery().then((res) => {
        if (res.status === true) {
          setSummeryData(res.data.summery);
          setIsLoading(false);
        }
      });
    }
    fetchData();
  }, []);
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

  const generateInit = {
    website: "",
    currency: "",
    marketingId: "",
  };
  const generateValid = Yup.object({});
  const handleOnApply = (event, picker) => {
    const start_date = picker.startDate.format("MM/DD/YYYY");
    const end_date = picker.endDate.format("MM/DD/YYYY");
    setDatePicker(`${start_date} - ${end_date}`);
  };
  const handleGenerateLink = async (values) => {
    setIsLoading(true);
    const responseData = await getAffiliateSummery({
      ...values,
      dates: datePicker,
    });
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
          title="Summery Report"
          path="Home => affiliate => report => summery report"
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
                          Generate Report
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
          {isLoading ? (
            <Loader />
          ) : (
            <Card header="">
              <div className="table-responsive">
                <table className="table bg-opacity-100">
                  <tbody>
                    <tr className="table-dark">
                      <td>Views</td>
                      <td>{summeryData.view}</td>
                    </tr>
                    <tr className="table-dark">
                      <td>Clicks</td>
                      <td>{summeryData.view}</td>
                    </tr>
                    <tr className="table-dark">
                      <td>Driect links</td>
                      <td>{summeryData.web_count}</td>
                    </tr>
                    <tr className="table-dark">
                      <td>Click/Views</td>
                      <td>
                        {summeryData.view !== 0
                          ? (summeryData.view / summeryData.view) * 100
                          : 0}{" "}
                        %
                      </td>
                    </tr>
                    <tr className="table-dark">
                      <td>Registrations</td>
                      <td>{summeryData.registration}</td>
                    </tr>
                    <tr className="table-dark">
                      <td>Registrations/Click ratio</td>
                      <td>
                        {summeryData.view !== 0
                          ? (
                              (summeryData.registration / summeryData.view) *
                              100
                            ).toFixed(2)
                          : 0}
                        %
                      </td>
                    </tr>
                    <tr className="table-dark">
                      <td>Registrations with deposit</td>
                      <td>{summeryData.new_depositor}</td>
                    </tr>
                    <tr className="table-dark">
                      <td>Registrations with deposit/Registration ratio</td>
                      <td>
                        {summeryData.registration !== 0
                          ? (
                              (summeryData.new_depositor /
                                summeryData.registration) *
                              100
                            ).toFixed(2)
                          : 0}
                        %
                      </td>
                    </tr>
                    <tr className="table-dark">
                      <td>Total new deposit amount</td>
                      <td>
                        {Number(summeryData.new_depositor_amount).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="table-dark">
                      <td>New depositors</td>
                      <td>{summeryData.new_depositor}</td>
                    </tr>
                    <tr className="table-dark">
                      <td>Accounts with deposits</td>
                      <td>
                        {Number(summeryData.all_deposit_amount).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="table-dark">
                      <td>Total Profit</td>
                      <td
                        style={{
                          color: Number(summeryData.profit) < 0 ? "red" : "",
                        }}
                      >
                        {Number(summeryData.profit).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="table-dark">
                      <td>Total Loss</td>
                      <td
                        style={{
                          color: Number(summeryData.loss) > 0 ? "red" : "",
                        }}
                      >
                        {Number(summeryData.loss).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="table-dark">
                      <td>Revenue</td>
                      <td
                        style={{
                          color: Number(summeryData.revenue) < 0 ? "red" : "",
                        }}
                      >
                        {Number(summeryData.revenue).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="table-dark">
                      <td>Active Player</td>
                      <td>{summeryData.active_player}</td>
                    </tr>
                    <tr className="table-dark">
                      <td>Bonus Amount</td>
                      <td
                        style={{
                          color: Number(summeryData.bonus) < 0 ? "red" : "",
                        }}
                      >
                        {Number(summeryData.bonus).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="table-dark">
                      <td>Referral Commission</td>
                      <td
                        style={{
                          color: Number(summeryData.revenue) < 0 ? "red" : "",
                        }}
                      >
                        {Number(summeryData.revenue).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AffiliatLayout>
  );
}

export default Summery