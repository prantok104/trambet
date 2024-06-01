import Card from "@/components/Card";
import ImageInputField from "@/components/Form/ImageInputField";
import InputField from "@/components/Form/InputField";
import { notify } from "@/components/Helper";
import { closeTicket, getTicketById, replyTicket } from "@/services/support";
import { FieldArray, Form, Formik } from "formik";
import moment from "moment";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Loader from "@/components/Loader";
import {
  FaClock,
  FaInfoCircle,
  FaPlusCircle,
  FaReply,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
import * as Yup from "yup";
import dayjs from "dayjs";
import Image from "next/image";
import ConstantData from "@/components/ConstantData";
import { useSelector } from "react-redux";
const Messaging = () => {
  const innerRef = useRef();
  const router = useRouter();
  const params = useParams();
  const [replys, setReplys] = useState([]);
  const [ticketDetails, setTicketDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [mute, setMute] = useState(true);
  const { user } = useSelector((state) => state.AuthReducer);
  const initialValues = {
    message: "",
    attachments: [],
  };
  const validationSchema = Yup.object({
    message: Yup.string().required("Replay is required"),
    attachments: Yup.array().nullable(),
  });

  const handleReplay = async (values) => {
    const response = await replyTicket({
      id: ticketDetails?.id,
      user_type: "user",
      message: values?.message,
      subject: ticketDetails?.subject,
      priority: ticketDetails?.priority,
      attachments: values?.attachments,
    });
    if (response?.status) {
      notify("success", response?.app_message);
      innerRef?.current?.setFieldValue("message", "");
      setMute((prevState) => !prevState);
    } else {
      notify("error", response?.message ?? response?.user_message);
    }
  };

  const handleCloseTicket = async () => {
    setLoading(true);
    const response = await closeTicket(ticketDetails?.id);
    if (response.status) {
      setLoading(false);
      notify("success", "Ticket Closed");
      if (router?.query?.page == "affiliate") {
        router.push("/affiliate/my-ticket");
      } else {
        router.push("/user/support/tickets");
      }
    } else {
      setLoading(false);
      notify("error", "Something Wrong");
    }
  };

  const effect = useCallback(async () => {
    await getTicketData();
  }, [mute]);

  const getTicketData = async () => {
    setLoading(true);
    const response = await getTicketById(router?.query?.ticket_id);
    if (response?.status) {
      setLoading(false);
      setReplys(response?.data?.messages);
      setTicketDetails(response?.data?.ticket);
    }
  };
  useEffect(() => {
    effect();
  }, [effect, router?.query?.ticket_id]);

  const statusCard = [
    { name: "Open", value: 0, bg: "primary" },
    { name: "Answered", value: 1, bg: "success" },
    { name: "Customer Replied", value: 2, bg: "primary" },
    { name: "Closed", value: 3, bg: "danger" },
  ];

  const betStatus = [
    { name: "Win", value: 1 },
    { name: "Pending", value: 2 },
    { name: "Lose", value: 3 },
    { name: "Refunded", value: 4 },
  ];


  const handleRefresh = () => {
    setMute(prevState => !prevState);
  }
  return (
    <>
      {router?.query?.ticket_id}
      {loading ? <Loader /> : ""}
      <div className="container">
        <div className="row">
          <div className="col-md-9 mx-auto">
            <Card
              header={
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    {statusCard.map((_item) =>
                      _item.value == ticketDetails?.status ? (
                        <Button key={_item.value} size="sm" variant={_item.bg}>
                          {_item.name}
                        </Button>
                      ) : null
                    )}
                    <strong style={{ marginLeft: "10px" }}>
                      [Ticket #{ticketDetails?.ticket} ]{" "}
                      {ticketDetails?.subject}
                    </strong>
                  </div>
                  <Button
                    onClick={handleCloseTicket}
                    size="sm"
                    variant="outline-danger"
                  >
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
                      <div className="col-md-12 my-2">
                        {ticketDetails?.trx_no && (
                          <h6 className="df-font mb-1">
                            Transaction ID : {ticketDetails?.trx_no}
                          </h6>
                        )}
                        {ticketDetails?.trx_date && (
                          <h6 className="df-font mb-1">
                            Transaction Date : {dayjs(ticketDetails?.trx_date).format('DD MMM, YYYY')}
                          </h6>
                        )}
                        {ticketDetails?.bets?.bet_number && (
                          <h6 className="df-font mb-1">
                            Bet : {ticketDetails?.bets?.bet_number} | Amount:{" "}
                            {Number(ticketDetails?.bets?.stake_amount).toFixed(
                              2
                            )}{" "}
                            | Bet type:{" "}
                            {ticketDetails?.bets?.type == "1"
                              ? "Single"
                              : "Multiple"}{" "}
                            | Stauts:{" "}
                            {
                              betStatus?.find(
                                (_item) =>
                                  _item?.value == ticketDetails?.bets?.status
                              )?.name
                            }
                          </h6>
                        )}
                      </div>
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
                                  <ImageInputField
                                    type="file"
                                    name={`attachments[${index}]`}
                                    style={{ width: "100%" }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="df-btn bg-danger"
                                  >
                                    <FaTimesCircle />
                                  </button>
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
              <Card
                header={
                  <div className="d-flex align-items-center justify-content-between">
                    <h6>Previous replies</h6>
                    <button onClick={handleRefresh} className="df-btn df-bg">
                      Refresh
                    </button>
                  </div>
                }
              >
                {replys?.map((reply, idx) => {
                  return (
                    <Card
                      key={idx}
                      header={
                        <div className="d-flex align-items-center justify-content-between">
                          <p style={{ textTransform: "capitalize" }}>
                            {reply?.admin ? reply?.admin?.name : 'You'}
                          </p>
                          <div
                            className="d-flex align-items-center gap-2"
                            style={{ fontSize: 9, color: "#ccc" }}
                          >
                            <FaClock />{" "}
                            {`${dayjs(reply?.created_at).format(
                              "DD MMM, YYYY hh:mm:ss"
                            )}`}
                          </div>
                        </div>
                      }
                      bg="#090F1E"
                      mt="10px"
                    >
                      <div className="d-flex flex-column gap-2">
                        <div>{reply?.message}</div>
                        {reply?.attachments?.length > 0 ? (
                          <div className="d-flex gap-2 flex-wrap mt-2">
                            {reply?.attachments?.map((item, keyValue) => (
                              <Image
                                key={keyValue}
                                src={`${ConstantData.TICKET_IMAGE_URL}${item?.attachment}`}
                                alt="replay_image"
                                width={0}
                                height={0}
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: "auto",
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </Card>
                  );
                })}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messaging;
