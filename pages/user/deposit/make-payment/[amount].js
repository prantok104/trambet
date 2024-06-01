
import Card from '@/components/Card'
import AlertCard from '@/components/AlertCard'
import Warning from '@/components/Warning'
import ListGroup from 'react-bootstrap/ListGroup';
import { Form as FormikForm, Formik } from "formik";
import InputField from "@/components/Form/InputField";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { notify } from '@/components/Helper';
const MakeDepositPage = () => {
  const innerRef = useRef();
  // // console.log(innerRef)
  const [initialValues, setInitialValues] = useState({
    amount: 100,
    wallet_number: '12qwew',
    trx_id: 'qqweqwe'
  })
  const validationSchema = Yup.object({
      amount: Yup.number().required().min(100).max(20000),
      wallet_number: Yup.string().required("Wallet number is required"),
      trx_id: Yup.string().required("Transaction ID is required"),
   });
   const handleSubmit = (values) => {
    notify("success", "Successfully deposit completed")
   }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-9 mx-auto">
            <Card header="Payment system in your region">
              <AlertCard message="Recommended payment method" />
              <h4 className="mt-4 mb-2">1. Make a Transfer</h4>
              <Warning
                message="Recommended payment method"
                style={{ background: "#282F42" }}
              />
              <div>
                <ListGroup>
                  <ListGroup.Item className="d-flex align-items-center justify-content-between">
                    <span>Bank Name</span>
                    <span>SureCash</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center justify-content-between">
                    <span>SureCash Wallet Number</span>
                    <span>3456788765</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center justify-content-between">
                    <span>SureCash Wallet Name</span>
                    <span>hasan-1</span>
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <h4 className="mt-4 mb-2">2. Request a Deposit</h4>
              <div className="user-deposit-form">
                <Formik
                  innerRef={innerRef}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize={true}
                >
                  {({ values, touched, errors }) => (
                    <FormikForm>
                      <div className="row">
                        <div className="col-md-12">
                          <InputField name="amount" disabled label="Amount*" />
                        </div>
                        <div className="col-md-12 mt-3">
                          <InputField
                            name="wallet_number"
                            label={`Your bKash wallet number`}
                          />
                        </div>

                        <div className="col-md-12 mt-3">
                          <InputField name="trx_id" label={`Transaction ID`} />
                        </div>

                        <div className="col-md-3 mt-3">
                          <button
                            type="submit"
                            className="df-btn df-bg df-radius df-border"
                          >
                            Make Payment
                          </button>
                        </div>
                      </div>
                    </FormikForm>
                  )}
                </Formik>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeDepositPage;
