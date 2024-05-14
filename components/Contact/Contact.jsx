"use client";
import React, { useRef, useState } from "react";
import contactImage from "@/public/contact_back.png";
import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";
import ContactCard from "./ContactCard";
import Card from "../Card";
import { Form, Formik } from "formik";
import * as Yup from 'yup'
import InputField from "../Form/InputField";
import { Button } from "react-bootstrap";
const Contact = () => {
  const innerRef = useRef();
  const [initialValues, setInitialValues] = useState({
    name: "Pranto Kumar",
    email: "prantok104@gmail.com",
    subject: "",
    message: "",
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required.'),
    email: Yup.string().required('Email is required.'),
    subject:Yup.string().required('Subject is required.'),
    message: Yup.string().required('Message is required.'),
  });

  const handleContact = (values) => {
    // // console.log(values)
  }

  return (
    <div
      style={{
        backgroundImage: `url(https://trambet.smshagor.com/assets/images/frontend/contact/62e7bd71160691659354481.png)`,
      }}
      className="contact-container"
    >
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-5">
            <div className="contact-card-area  d-flex flex-column gap-3">
              <ContactCard
                icon={<FaMapMarkedAlt />}
                title={"Address Details"}
                content={"1520 North Kierland Bl.100 Old City"}
              />
              <ContactCard
                icon={<FaMapMarkedAlt />}
                title={"Contact No"}
                content={"0123 - 4567 -890"}
              />
              <ContactCard
                icon={<FaMapMarkedAlt />}
                title={"Email Details"}
                content={"support@mail.com"}
              />
            </div>
          </div>
          <div className="col-md-7">
            <Card header="Get in Touch">
              <Formik
                innerRef={innerRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={handleContact}
              >
                {() => (
                  <Form>
                    <div className="row">
                      <div className="col-md-12">
                        <InputField name="name" label="Name*" disabled />
                      </div>
                      <div className="col-md-12 mt-3">
                        <InputField name="email" label="Email*" disabled />
                      </div>
                      <div className="col-md-12 mt-3">
                        <InputField name="subject" label="Subject*" />
                      </div>
                      <div className="col-md-12 mt-3">
                        <InputField
                          name="message"
                          label="Message*"
                          as="textarea"
                        />
                      </div>
                      <div className="col-md-12 mt-3">
                        <Button type="submit" className="df-btn df-bg">Send Message</Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
