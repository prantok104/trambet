import React, {useState, useRef, useEffect} from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import InputField from "@/components/Form/InputField";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import AffiliatLayout from "../../layout";
import SummeryTable from "@/models/SummeryTable";
import {getAffiliateSummery} from "@/services/affiliate";

const Summery = () => {
    const innerRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [summeryData, setSummeryData] = useState([]);
    const [filter, setFilter] = useState({
        page: 1,
        per_page: 10,
        order_by: "DESC",
    });
    const [initialValues, setInitialValues] = useState({
        search: "",
    });
    const validationSchema = Yup.object({
        search: Yup.string(),
    });
    useEffect(() => {
        async function fetchData() {
            const data = await getAffiliateSummery();
            setSummeryData(data);
            console.log('summery data',summeryData);
        }
        fetchData();
    }, []);
    const handleSubmit = (values) => {
        if(values.search != null){
            setSearchData({ search: values.search });
            fetchData(1);
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
              <Card
                  header=""
                  filter={
                      <div className="text-right">
                          <Formik
                              innerRef={innerRef}
                              initialValues={initialValues}
                              validationSchema={validationSchema}
                              onSubmit={handleSubmit}
                              enableReinitialize={true}
                          >
                              {({values}) => (
                                  <FormikForm>
                                      <div className="d-flex align-items-center gap-2 justify-content-end">
                                          <InputField name="search" placeholder="Search"/>
                                          <button
                                              className="df-btn py-1 reg-btn text-uppercase"
                                              onClick={handleSubmit}
                                          >
                                              search
                                          </button>
                                      </div>
                                  </FormikForm>
                              )}
                          </Formik>
                      </div>
                  }
              >
                  <div className="table-responsive">
                      <table className="table bg-opacity-100">

                          <tbody>
                          <tr className="table-dark">
                              <td>Views</td>
                              <td></td>
                          </tr>
                          <tr className="table-dark">
                              <td>Clicks</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Driect links</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Click/Views</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Registrations</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Registrations/Click ratio</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Registrations with deposit</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Registrations with deposit/Registration ratio</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Total new deposit amount</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>New depositors</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Accounts with deposits</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Total Profit</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Total Loss</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Revenue</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Active Player</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Bonus Amount</td>
                              <td>0</td>
                          </tr>
                          <tr className="table-dark">
                              <td>Referral Commission</td>
                              <td>0</td>
                          </tr>


                          </tbody>
                      </table>
                  </div>
              </Card>
          </div>
        </div>
      </AffiliatLayout>
    );
}

export default Summery