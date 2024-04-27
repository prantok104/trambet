"use client"

import Card from '@/components/Card';
import InputField from '@/components/Form/InputField';
import ApplicationsList from '@/models/Affiliate/ApplicationsList';
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
    const [data, setData] = useState([]);
   const initialValues = {
     application: '',
     website: ''
   };
   const validationSchema = Yup.object({
     application: Yup.string().required("Application is required"),
     website: Yup.string().required("Website is required"),
   });
  const rows = {
    data:  [
      {
         date: "2024-04-23",
         description: "Meeting with clients",
         status: "Scheduled"
      },
      {
         date: "2024-04-25",
         description: "Submit quarterly report",
         status: "In progress"
      },
      {
         date: "2024-04-28",
         description: "Review project proposals",
         status: "Pending"
      },
      {
         date: "2024-04-30",
         description: "Training session",
         status: "Completed"
      },
      {
         date: "2024-05-02",
         description: "Team brainstorming",
         status: "Ongoing"
      },
      {
         date: "2024-05-05",
         description: "Finalize budget plan",
         status: "Planned"
      }
   ],
    current_page: 1,
    per_page: 10,
    total: 11,
  };

  useEffect(() => {
    setTimeout(() => {
      setData(rows)
    }, 2000)
  })

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