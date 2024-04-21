import React, { useState, useRef } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import InputField from "@/components/Form/InputField";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import AffiliatLayout from "../layout";
import Website from "@/models/Website";

const Websites = () => {
  
  // return (
  //   <div>
  //     <table className="table table-dark table-striped">
  //       <thead>
  //         <tr>
  //           <th scope="col">#</th>
  //           <th scope="col">Website Id</th>
  //           <th scope="col">Website</th>
  //           <th scope="col">Status</th>
  //           <th scope="col">Create At</th>
  //           <th scope="col">Action</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         <tr>
  //           <th scope="row">1</th>
  //           <td>Affiliate Promo Code</td>
  //           <td>www.google.com</td>
  //           <td>
  //             <span class="badge bg-success">Active</span>
  //           </td>
  //           <td>21 Jan, 2024</td>
  //           <td>
  //             <div className="d-flex justify-content-center gap-2">
  //               <button type="submit" className="btn btn-primary btn-sm d-flex justify-content-center">
  //                 <FaEdit />
  //               </button>
  //               <button type="submit" className="btn btn-danger btn-sm d-flex justify-content-center">
  //                 <FaTrash />
  //               </button>
  //             </div>
  //           </td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   </div>
  // );
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
    data: [
      { year: 40 },
      { year: 20 },
    ],
    current_page: 1,
    per_page: 10,
    total: 11,
  };

  const handlePageSizeChange = (pageSize) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        per_page: pageSize,
      };
    });
  };
  const handlePageChange = (page) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        page: page,
      };
    });
  };

  const handleAction = async (event, data) => {};

  const handleSubmit = (values) => {};
  return (
    <AffiliatLayout>
      <div className="container-fluid">
        <Breadcrumb
          title="Websites"
          path="Home => affiliate => websites"
        />
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
            <Website
              isLoading={isLoading}
              rows={rows}
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

export default Websites;
