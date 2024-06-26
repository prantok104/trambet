import React, { useState, useRef, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import DepositHistory from "@/models/DepositHistory";
import InputField from "@/components/Form/InputField";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import AffiliatLayout from "../layout";
import RegisterUser from "@/models/RegisterUser";
import { getRegisterUser } from "@/services/affiliate";

const RegisterUsers = () => {
  const innerRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filter, setFilter] = useState({
    page: 1,
    per_page: 10,
    order_by: "DESC",
    searchValue: "",
  });
  const [initialValues, setInitialValues] = useState({
    search: "",
  });
  const validationSchema = Yup.object({
    search: Yup.string(),
  });

  const fetchData = async (page, search = "") => {
    setIsLoading(true);
    await getRegisterUser(page, perPage, search)
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

  const handlePageSizeChange = async (newPerPage, page) => {
    // setFilter((prevState) => {
    //   return {
    //     ...prevState,
    //     per_page: pageSize,
    //   };
    // });

    setIsLoading(true);
    await getRegisterUser(page, newPerPage)
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
  const handlePageChange = (page) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        page: page,
      };
    });
    fetchData(page);
  };

  const handleAction = async (event, data) => {};

  const handleSubmit = async (values) => {
    if (values.search) {
      fetchData(filter?.page, values.search);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <AffiliatLayout>
      <div className="container-fluid">
        <Breadcrumb
          title="Register Users"
          path="Home => affiliate => register users"
        />
        <div className="mt-2">
          <Card
            header="History"
            filter={
              <div className="text-right">
                {/* <Formik
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
                          type="submit"
                        >
                          search
                        </button>
                      </div>
                    </FormikForm>
                  )}
                </Formik> */}
              </div>
            }
          >
            <RegisterUser
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

export default RegisterUsers;
