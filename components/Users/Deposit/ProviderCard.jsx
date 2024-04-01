import React, { useState, useRef } from "react";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import { Form as FormikForm, Formik } from "formik";
import InputField from "@/components/Form/InputField";
import * as Yup from "yup";
import { useRouter } from 'next/router';
const ProviderCard = ({providers}) => {
   const formikRef = useRef();
   const navigate = useRouter();;
   const [modalView, setModalView] = useState(false);
   const [provider, setProvider] = useState({});
   const [amount, setAmount] = useState(0);
   const [maxAmount, setMaxAmount] = useState(0);
   const handleProviderModal = (item) => {
      setProvider(item);
      setAmount(item?.min);
      setMaxAmount(item?.max);
      setModalView(true);
   }
   
   const validationSchema = Yup.object({
      amount: Yup.number().required("First name required").min(amount).max(maxAmount),
   });
   const initialValues = {
      amount: amount,
   };
   const handleSubmit = async (
      values
   ) => {
      if(values?.amount > 0) {
         const stateData = {amount:values?.amount};

         navigate.push("/");
      }
   };

  return (
    <div className="all-providers-card">
      {providers?.map((item, key) => (
        <div
          key={key}
          className="single-providers-card"
          onClick={() => handleProviderModal(item)}
        >
          <Image
            src={item.image}
            alt={item.name}
            width={160}
            height={90}
            style={{ objectFit: "cover" }}
            placeholder={"blur"}
          />
          <h6>{item?.name}</h6>
        </div>
      ))}

      {/* Promocard modal area start */}
      <Modal
        show={modalView}
        onHide={() => setModalView(false)}
        backdrop="static"
        keyboard={false}
        className="login-page"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="text-center bg-shadow py-2">
              <Image
                src={provider?.image}
                alt={provider?.name}
                width={130}
                height={70}
              />
              <span
                style={{
                  fontSize: 14,
                  display: "block",
                  textAlign: "center",
                  marginBottom: "15px",
                  marginTop: "15px",
                }}
              >
                Amount minimum {provider?.min}BDT / maximum {provider?.max}BDT
              </span>
            </div>

            <Formik innerRef={formikRef} initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={handleSubmit}
               enableReinitialize={true}
               class="form-data">
               {({ values,touched, errors }) => (
               <FormikForm>
                  <InputField name="amount" label="amount*" />
                     <button className="df-btn reg-btn mt-2" style={{ width: "100%" }}>
                        CONFIRM
                     </button>
               </FormikForm>
               )}
               </Formik>
          </div>
        </Modal.Body>
      </Modal>
      {/* Promocard modal area end */}
    </div>
  );
}

export default ProviderCard