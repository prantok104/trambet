import React, { useState, useRef, useEffect, useCallback } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import BetHistoryModel from "@/models/BetHistory";
import InputField from "@/components/Form/InputField";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import { HttpClientCall } from "@/components/HTTPClient";
import { betsHisotry } from "@/services/BetService";
const BetHistory = () => {
  const innerRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleAction = async (event, data) => {};

  const handleSubmit = (values) => {};

  const [data, setData] = useState([]);

  const effect = useCallback(async () => {
   await fetchData();
  }, [filter])

  const fetchData = async () => {
    setIsLoading(true);
    await betsHisotry(filter?.page, filter?.per_page)
      .then((res) => {
        if (res) {
          setData(res);
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
      effect();
  },[effect])

  const handlePageChange = (page) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        page: page,
      };
    });
  };

  const handlePageSizeChange = async(pageSize) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        per_page: pageSize,
      };
    });
  }; 

  return (
    <div className="container-fluid">
      <Breadcrumb title="Deposit history" path="Home => Bet => bet history" />
      <div className="mt-2">
        <Card
          header="History"
          filter={
            <div className="text-right">
              <Formik
                innerRef={innerRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ values }) => (
                  <FormikForm>
                    <div className="d-flex align-items-center gap-2 justify-content-end">
                      <InputField name="search" placeholder="Search" />
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
          <BetHistoryModel
            isLoading={isLoading}
            rows={data}
            handleAction={handleAction}
            handlePageSizeChange={handlePageSizeChange}
            handlePageChange={handlePageChange}
          />
        </Card>
      </div>
    </div>
  );
};

export default BetHistory;
