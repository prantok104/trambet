import React from "react";
import AffiliatLayout from "../layout";
import Myticket from "@/components/Affiliate/MyTicket/Myticket";
import  { useState, useRef, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import InputField from "@/components/Form/InputField";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import Website from "@/models/Website";
import { getMyTickets, getWebsites } from "@/services/affiliate";

const MyTicketPage = () => {
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
  const [searchData, setSearchData] = useState("");

  const fetchData = async (page, search = "") => {
    setIsLoading(true);
    await getMyTickets(page, perPage, search)
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
    if (values.search) {
      fetchData(filter?.page, values.search);
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
    await getMyTickets(page, newPerPage)
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

  return (
    <AffiliatLayout>
       <div className="container-fluid">
        <Breadcrumb title="Websites" path="Home => affiliate => my ticket" />
        <div className="mt-2">
          <Card
            header="Websites"
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
                          type="submit"
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
            <Myticket
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

export default MyTicketPage;
