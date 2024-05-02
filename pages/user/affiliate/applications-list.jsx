"use client"

import Card from '@/components/Card';
import InputField from '@/components/Form/InputField';
import ApplicationsList from '@/models/Affiliate/ApplicationsList';
import { createAffiliateApplication, getApplyList } from '@/services/affiliate';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap';
import * as Yup from 'yup'
const applicationsList = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [applyModal, setApplyModal] = useState(false)
   const innerRef = useRef();
   const [filter, setFilter] = useState({
      page: 1,
      per_page: 10,
      order_by: "DESC",
    });

   const initialValues = {
     application: '',
     website: ''
   };
   const validationSchema = Yup.object({
     application: Yup.string().required("Application is required"),
     website: Yup.string().required("Website is required"),
   });




  const handleAction = async (event, data) => {};

  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchData = async(page) => {
    setIsLoading(true);
    await getApplyList(page, perPage).then((response) => {
      console.log(response)
      if(response.status == true){
        setData(response)
        setTotalRows(response?.paginationData?.totalItems)
        setIsLoading(false)
      }
    })

  }

  const handlePageChange = (page) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        page: page,
      };
    });
    fetchData(page);
  };

  const handlePageSizeChange = async(newPerPage, page) => {
    // setFilter((prevState) => {
    //   return {
    //     ...prevState,
    //     per_page: pageSize,
    //   };
    // });

    setIsLoading(true);
    await getApplyList(page, perPage).then((response) => {
      if(response.status == true){
        setData(response)
        setTotalRows(response?.paginationData?.totalItems)
        setIsLoading(false)
      }
    }).then(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handleSubmit = async(values) => {
    const payload = {
      description : values.application,
      website : values.website
    }
    await createAffiliateApplication(payload).then((response) => {
      if(response.status === true){
        setApplyModal(false)
      }
    })
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 mx-auto">
          <Card
            header={
              <div className="d-flex align-items-center justify-content-between">
                <p>Applications list for affiliate</p>
                <button
                  onClick={() => setApplyModal(true)}
                  className="df-btn df-bg"
                >
                  Apply for affiliate
                </button>
              </div>
            }
          >
            <div suppressHydrationWarning>
              <ApplicationsList
                isLoading={isLoading}
                rows={data}
                handleAction={handleAction}
                handlePageSizeChange={handlePageSizeChange}
                handlePageChange={handlePageChange}
              />
            </div>
          </Card>
        </div>

        {/* Apply from modal start */}
        <Modal
          size="lg"
          show={applyModal}
          onHide={() => setApplyModal(false)}
          backdrop="static"
          keyboard={false}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Affiliate Applicaiton Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card header={"Affiliate Applicaiton Form"}>
              <Formik
                innerRef={innerRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
                    <div className="row">
                      <div className="col-md-12 mt-3">
                        <InputField
                          name="application"
                          label={"Application*"}
                          as="textarea"
                        />
                      </div>
                      <div className="col-md-12 mt-3">
                        <InputField name="website" label={"Website*"} />
                      </div>

                      <div className="col-md-12 mt-2">
                        <button type="submit" className="df-btn df-bg">
                          Apply for Affiliate
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card>
          </Modal.Body>
        </Modal>
        {/* Apply from modal end */}
      </div>
    </div>
  );
}

export default applicationsList