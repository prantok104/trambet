"use client";
import React, { useState, useRef, useEffect } from "react";
import AffiliatLayout from "../../layout";
import WithdrawHistoryTable from "@/models/WithdrawHistoryTable";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import InputField from "@/components/Form/InputField";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import { getWithdrawHistory } from "@/services/affiliate";

const WithdrawHistory = () => {
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

  const rows = {
    data: [{ year: 40 }, { year: 20 }],
    current_page: 1,
    per_page: 10,
    total: 11,
  };
  const handleAction = async (event, data) => {};
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchTransaction, setSearchTransaction] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const searchData = {
    search: searchTransaction,
    dates: searchDate,
  };

  const fetchData = async (page, search) => {
    setIsLoading(true);
    await getWithdrawHistory(page, perPage, search)
      .then((res) => {
        if (res) {
          setData(res);
          setTotalRows(res?.paginationData?.totalItems);
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  };
  const handleSubmit = (values) => {
    if (values.search != null || values.daterange != null) {
      const searchData = {
        search: values?.search,
        dates: values.daterange,
      };
      fetchData(1, searchData);
    }
  };
  const handlePageChange = (page) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        page: page,
      };
    });
    fetchData(page);
  };

  const handlePageSizeChange = async (newPerPage, page) => {
    setIsLoading(true);
    await getWithdrawHistory(page, newPerPage)
      .then((res) => {
        if (res) {
          setData(res);
          setTotalRows(res?.paginationData?.totalItems);
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  return (
    <AffiliatLayout>
      <div className="container-fluid">
        <Breadcrumb
          title="Withdraw History"
          path="Home => affiliate => withdraw => history"
        />
        <div className="mt-2">
          <Card
            header="Withdraw"
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
                      <div></div>
                      <div className="d-flex align-items-center gap-2 justify-content-end">
                        <InputField
                          name="search"
                          placeholder="Search by Transaction"
                        />
                        <InputField
                          name="daterange"
                          placeholder="Search by Date"
                        />
                        <button
                          className="df-btn py-1 reg-btn text-uppercase"
                          type="submit"
                          // onClick={handleSubmit}
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
            <WithdrawHistoryTable
              isLoading={isLoading}
              rows={data}
              handleAction={handleAction}
              handlePageSizeChange={handlePageSizeChange}
              handlePageChange={handlePageChange}
            />
          </Card>
        </div>
      </div>
    </AffiliatLayout>
  );
};

export default WithdrawHistory;
