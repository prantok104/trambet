import Card from "@/components/Card";
import InputField from "@/components/Form/InputField";
import SelectField from "@/components/Form/SelectField";
import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  FaClock,
  FaInfo,
  FaInfoCircle,
  FaPlusCircle,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
import * as Yup from "yup";
import { getBetList, createNewSupportTicket } from "@/services/support";
import { notify } from "@/components/Helper";
const Support = () => {
  const router = useRouter();
  const innerRef = useRef();
  const initialValues = {
    subject: "Bet issue",
    priority: 3,
    message: "",
    attachments: [],
  };

  const validationSchema = Yup.object({
    subject: Yup.string().required("Subject is required"),
    priority: Yup.string().required("Priority is required"),
    message: Yup.string().required("Message is required"),
    attachments: Yup.array(),
    bet_no: Yup.string().when("subject", {
      is: (val) => val == "Bet issue",
      then: (schema) => schema.required("Bet number is required."),
      otherwise: (schema) => schema.nullable(),
    }),
    transaction_id: Yup.string().when("subject", (subject) => {
      if (subject == "Withdraw problem" || subject == "Deposit problem") {
        return Yup.string().required("Transaction ID is required.");
      }
      return Yup.string().nullable();
    }),
    transaction_date: Yup.string().when("subject", (subject) => {
      if (subject == "Withdraw problem" || subject == "Deposit problem") {
        return Yup.string().required("Transaction date is required.");
      }
      return Yup.string().nullable();
    }),
  });

  const supports = [
    {
      label: "---Select Subject---",
      value: "",
    },
    {
      label: "Withdraw problem",
      value: "Withdraw problem",
    },
    {
      label: "Deposit problem",
      value: "Deposit problem",
    },
    {
      label: "Bet issue",
      value: "Bet issue",
    },
    {
      label: "KYC",
      value: "KYC",
    },
    {
      label: "Banned",
      value: "Banned",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];
  const priorities = [
    {
      label: "High",
      value: 3,
    },
    {
      label: "Medium",
      value: 2,
    },
    {
      label: "Low",
      value: 1,
    },
  ];

  const [bets, setBets] = useState([
    {
      label: "---Select Bet---",
      value: "",
    },
  ]);
  useEffect(() => {
    async function fetchData() {
      await getBetList().then((res) => {
        if (res.status === true) {
          const originalData = res.data;
          const transformedData = originalData.map((bet, index) => {
            return {
              label: `${bet.bet_number} -- ${Number(bet.amount).toFixed(
                2
              )} -- ${bet.type === 1 ? "Single" : "Multiple"}`,
              value: `${bet.bet_num}`,
            };
          });
          setBets(transformedData);
        }
      });
    }

    fetchData();
  }, []);

  // Form submit
  const handleSupportSubmit = async (values) => {
    const payload = {
      subject: values?.subject,
      priority: values?.priority,
      message: values?.message,
      attachments: values?.attachments,
      bet_no: values?.bet_no ?? "",
      transaction_id: values?.transaction_id ?? "",
      transaction_date: values?.transaction_date ?? "",
    };
    const response = await createNewSupportTicket(payload);
    if (response?.status) {
      notify("success", response?.app_message);
      router.push("/user/support/ticket/message/" + response?.message_id);
    } else {
      notify("error", response?.user_message);
    }
    // await createNewSupportTicket(payload).then((response) => {
    //   if (response?.status === true) {
    //     notify("success", response?.message);
    //     // router.push("/user/support/ticket/message/" + response?.data?.ticket_id);
    //     // router.push("/user/support/ticket/message/" + response?.data?.ticket_id);
    //   } else {
    //     notify("error", response?.user_message);
    //   }
    // });

    // router.push({pathname: '/user/support/ticket/message/20sd',
    //    query: {
    //       subject: values?.subject
    //    }
    // })
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <Card header={"Open New Ticket"}>
            <Formik
              innerRef={innerRef}
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={handleSupportSubmit}
            >
              {({ values, errors }) => (
                <Form encType="multipart/form-data">
                  <div className="row">
                    <div className="col-md-6">
                      <SelectField
                        name="subject"
                        label={"Subject*"}
                        options={supports}
                      />
                    </div>
                    <div className="col-md-6">
                      <SelectField
                        name="priority"
                        label={"Priority*"}
                        options={priorities}
                      />
                    </div>
                    {(values?.subject == "Withdraw problem" ||
                      values?.subject == "Deposit problem") && (
                      <>
                        <div className="col-md-6 mt-3">
                          <InputField
                            name="transaction_id"
                            label={"Transaction ID*"}
                            placeholder={`Transaction ID for ${values?.subject}`}
                          />
                        </div>
                        <div className="col-md-6 mt-3">
                          <InputField
                            name="transaction_date"
                            label={"Transaction Date*"}
                            type="date"
                          />
                        </div>
                      </>
                    )}
                    {values?.subject == "Bet issue" && (
                      <div className="col-md-12 mt-3">
                        <SelectField
                          name="bet_no"
                          label={"Bet*"}
                          options={bets}
                        />
                      </div>
                    )}
                    <div className="col-md-12 mt-3">
                      <InputField
                        name="message"
                        label={"Message*"}
                        as="textarea"
                      />
                    </div>
                    <div className="col-md-12 mt-3">
                      <FieldArray name="attachments">
                        {({ push, remove, form }) => (
                          <div>
                            <div className="d-flex align-item-center justify-content-between">
                              <label htmlFor="attachment">Attachments</label>
                              <button
                                type="button"
                                onClick={() => push(null)} // Remove this line
                                className="df-btn mb-2 df-bg"
                              >
                                <FaPlusCircle style={{ marginTop: "-2px" }} />
                                Add Attachments
                              </button>
                            </div>
                            {values.attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="mb-2 d-flex gap-2"
                                style={{ width: "100%" }}
                              >
                                <InputField
                                  type="file"
                                  name={`attachments[${index}]`}
                                  style={{ width: "100%" }}
                                />
                                {index !== 0 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="df-btn bg-danger"
                                  >
                                    <FaTimesCircle />
                                  </button>
                                )}
                              </div>
                            ))}

                            <div className="file-extensions d-flex align-items-center gap-2">
                              <FaInfoCircle /> Allowed File Extensions: .jpg,
                              .jpeg, .png, .pdf, .doc, .docx
                            </div>
                          </div>
                        )}
                      </FieldArray>
                    </div>

                    <div className="col-md-12 mt-2 text-end">
                      <button type="submit" className="df-btn df-bg">
                        Create Ticket
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;
