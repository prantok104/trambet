import Card from "@/components/Card";
import InputField from "@/components/Form/InputField";
import { closeTicket, replyTicket } from "@/services/support";
import { FieldArray, Form, Formik } from "formik";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import {
  FaClock,
  FaInfoCircle,
  FaPlusCircle,
  FaReply,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
import * as Yup from "yup";
const Messaging = () => {
  const innerRef = useRef();
  const router = useRouter();
  const { ticket_id } = useParams();
  const { subject } = router?.query;
  const initialValues = {
    message: "",
    attachments: [],
  };
  const validationSchema = Yup.object({
    message: Yup.string().required("Replay is required"),
    attachments: Yup.array(),
  });
  const handleReplay = async (values) => {
    console.log(values);
    const data = {
      ...values,
      id: ticket_id,
    };
    const response = await replyTicket(data);
    console.log("🚀 ~ handleReplay ~ response:", response)
    if (response?.status) {
      // notify("success", response?.app_message);
      // router.push("/user/support/ticket/message/" + response?.message_id);
    } else {
      notify("error", response?.user_message);
    }
  };
  const handleCloseTicket = async () =>{
    const response = await closeTicket(ticket_id);
    console.log(response);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 mx-auto">
          <Card
            header={
              <div className="d-flex align-items-center justify-content-between gap-2">
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <Button size="sm" variant="primary">
                    Open
                  </Button>

                  <Button size="sm" variant="warning">
                    Customer replay
                  </Button>

                  <Button size="sm" variant="success">
                    Answered
                  </Button>
                  <strong style={{ marginLeft: "10px" }}>
                    [Ticket #2325474 ] {subject}
                  </strong>
                </div>
                <Button onClick={handleCloseTicket} size="sm" variant="outline-danger">
                  Close Ticket <FaTimes />
                </Button>
              </div>
            }
          >
            <Formik
              innerRef={innerRef}
              validationSchema={validationSchema}
              initialValues={initialValues}
              enableReinitialize
              onSubmit={handleReplay}
            >
              {({ values }) => (
                <Form>
                  <div className="row">
                    <div className="col-md-12">
                      <InputField
                        as="textarea"
                        name="message"
                        label="Replay*"
                        placeholder="Replay"
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
                                <FaPlusCircle style={{ marginTop: "-2px" }} />{" "}
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
                        <FaReply style={{ marginTop: "-2px" }} /> Replay
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>

          <div className="mt-2">
            <Card header="Previous replies">
              <Card
                header={
                  <div className="d-flex align-items-center justify-content-between">
                    Replay User
                    <div
                      className="d-flex align-items-center gap-2"
                      style={{ fontSize: 9, color: "#ccc" }}
                    >
                      <FaClock /> 27th April 2024 @ 00:41
                    </div>
                  </div>
                }
                bg="#090F1E"
                mt="10px"
              >
                Please check the email.
              </Card>
              <Card
                header={
                  <div className="d-flex align-items-center justify-content-between">
                    Pranto Kumar
                    <div
                      className="d-flex align-items-center gap-2"
                      style={{ fontSize: 9, color: "#ccc" }}
                    >
                      <FaClock /> 27th April 2024 @ 00:41
                    </div>
                  </div>
                }
                bg="#090F1E"
                mt="10px"
              >
                Please check the email.
              </Card>
              <Card
                header={
                  <div className="d-flex align-items-center justify-content-between">
                    Supporter
                    <div
                      className="d-flex align-items-center gap-2"
                      style={{ fontSize: 9, color: "#ccc" }}
                    >
                      <FaClock /> 27th April 2024 @ 00:41
                    </div>
                  </div>
                }
                bg="#090F1E"
                mt="10px"
              >
                Please check the email.
              </Card>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
