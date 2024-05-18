import Card from "@/components/Card";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaArrowRightLong } from "react-icons/fa6";

const Promotion = () => {

  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState({});

  const promotions = [
    {
      header: "Welcome bonus 300 BDT on registration",
      title: "Welcome bonus",
      amount: "+ 300 BDT",
      image: "/gift.png",
      details:
        "Cashback percentage ◆ Input percentage ● Loss Calculation duration ◆ Select duration ● Select Game type ◆ Sports [pre match only] ➢ Wager ■ input wager x ➢ Rollover ■ Input rollover number ➢ Minimum bet selection in a multibet ■ Input selection number ➢ Minimum odds selection ■ Input minimum odd coefficient ◆ Casino [listed games] ➢ Wager ■ Input wager x ● Bonus playing Time ◆ Selection (example 24h, 48h, 72h, 7days) ● Activation day ◆ List of 7 days ● Maximum claim in week ◆ Input number  Cashback percentage ◆ Input percentage ● Loss Calculation duration ◆ Select duration ● Select Game type ◆ Sports [pre match only] ➢ Wager ■ input wager x ➢ Rollover ■ Input rollover number ➢ Minimum bet selection in a multibet ■ Input selection number ➢ Minimum odds selection ■ Input minimum odd coefficient ◆ Casino [listed games] ➢ Wager ■ Input wager x ● Bonus playing Time ◆ Selection (example 24h, 48h, 72h, 7days) ● Activation day ◆ List of 7 days ● Maximum claim in week ◆ Input numberCashback percentage ◆ Input percentage ● Loss Calculation duration ◆ Select duration ● Select Game type ◆ Sports [pre match only] ➢ Wager ■ input wager x ➢ Rollover ■ Input rollover number ➢ Minimum bet selection in a multibet ■ Input selection number ➢ Minimum odds selection ■ Input minimum odd coefficient ◆ Casino [listed games] ➢ Wager ■ Input wager x ● Bonus playing Time ◆ Selection (example 24h, 48h, 72h, 7days) ● Activation day ◆ List of 7 days ● Maximum claim in week ◆ Input number",
    },
    {
      header: "Cashback up to 30% on casinos",
      title: "Cashback bonus",
      amount: "+ 300 BDT",
      image: "/casino.png",
      details:
        "Cashback percentage ◆ Input percentage ● Loss Calculation duration ◆ Select duration ● Select Game type ◆ Sports [pre match only] ➢ Wager ■ input wager x ➢ Rollover ■ Input rollover number ➢ Minimum bet selection in a multibet ■ Input selection number ➢ Minimum odds selection ■ Input minimum odd coefficient ◆ Casino [listed games] ➢ Wager ■ Input wager x ● Bonus playing Time ◆ Selection (example 24h, 48h, 72h, 7days) ● Activation day ◆ List of 7 days ● Maximum claim in week ◆ Input number ",
    },
    {
      header: "Welcome bonus 300 BDT on registration",
      title: "Welcome bonus",
      amount: "+ 300 BDT",
      image: "/gift.png",
      details:
        "Cashback percentage ◆ Input percentage ● Loss Calculation duration ◆ Select duration ● Select Game type ◆ Sports [pre match only] ➢ Wager ■ input wager x ➢ Rollover ■ Input rollover number ➢ Minimum bet selection in a multibet ■ Input selection number ➢ Minimum odds selection ■ Input minimum odd coefficient ◆ Casino [listed games] ➢ Wager ■ Input wager x ● Bonus playing Time ◆ Selection (example 24h, 48h, 72h, 7days) ● Activation day ◆ List of 7 days ● Maximum claim in week ◆ Input number ",
    },
    {
      header: "Cashback up to 30% on casinos",
      title: "Cashback bonus",
      amount: "+ 300 BDT",
      image: "/casino.png",
      details:
        "Cashback percentage ◆ Input percentage ● Loss Calculation duration ◆ Select duration ● Select Game type ◆ Sports [pre match only] ➢ Wager ■ input wager x ➢ Rollover ■ Input rollover number ➢ Minimum bet selection in a multibet ■ Input selection number ➢ Minimum odds selection ■ Input minimum odd coefficient ◆ Casino [listed games] ➢ Wager ■ Input wager x ● Bonus playing Time ◆ Selection (example 24h, 48h, 72h, 7days) ● Activation day ◆ List of 7 days ● Maximum claim in week ◆ Input number ",
    },
    {
      header: "Welcome bonus 300 BDT on registration",
      title: "Welcome bonus",
      amount: "+ 300 BDT",
      image: "/gift.png",
      details:
        "Cashback percentage ◆ Input percentage ● Loss Calculation duration ◆ Select duration ● Select Game type ◆ Sports [pre match only] ➢ Wager ■ input wager x ➢ Rollover ■ Input rollover number ➢ Minimum bet selection in a multibet ■ Input selection number ➢ Minimum odds selection ■ Input minimum odd coefficient ◆ Casino [listed games] ➢ Wager ■ Input wager x ● Bonus playing Time ◆ Selection (example 24h, 48h, 72h, 7days) ● Activation day ◆ List of 7 days ● Maximum claim in week ◆ Input number ",
    },
    {
      header: "Cashback up to 30% on casinos",
      title: "Cashback bonus",
      amount: "+ 300 BDT",
      image: "/casino.png",
      details:
        "Cashback percentage ◆ Input percentage ● Loss Calculation duration ◆ Select duration ● Select Game type ◆ Sports [pre match only] ➢ Wager ■ input wager x ➢ Rollover ■ Input rollover number ➢ Minimum bet selection in a multibet ■ Input selection number ➢ Minimum odds selection ■ Input minimum odd coefficient ◆ Casino [listed games] ➢ Wager ■ Input wager x ● Bonus playing Time ◆ Selection (example 24h, 48h, 72h, 7days) ● Activation day ◆ List of 7 days ● Maximum claim in week ◆ Input number ",
    },
    {
      header: "Welcome bonus 300 BDT on registration",
      title: "Welcome bonus",
      amount: "+ 300 BDT",
      image: "/gift.png",
      details:
        "Cashback percentage ◆ Input percentage ● Loss Calculation duration ◆ Select duration ● Select Game type ◆ Sports [pre match only] ➢ Wager ■ input wager x ➢ Rollover ■ Input rollover number ➢ Minimum bet selection in a multibet ■ Input selection number ➢ Minimum odds selection ■ Input minimum odd coefficient ◆ Casino [listed games] ➢ Wager ■ Input wager x ● Bonus playing Time ◆ Selection (example 24h, 48h, 72h, 7days) ● Activation day ◆ List of 7 days ● Maximum claim in week ◆ Input number ",
    },
    {
      header: "Cashback up to 30% on casinos",
      title: "Cashback bonus",
      amount: "+ 300 BDT",
      image: "/casino.png",
      details:
        "Cashback percentage ◆ Input percentage ● Loss Calculation duration ◆ Select duration ● Select Game type ◆ Sports [pre match only] ➢ Wager ■ input wager x ➢ Rollover ■ Input rollover number ➢ Minimum bet selection in a multibet ■ Input selection number ➢ Minimum odds selection ■ Input minimum odd coefficient ◆ Casino [listed games] ➢ Wager ■ Input wager x ● Bonus playing Time ◆ Selection (example 24h, 48h, 72h, 7days) ● Activation day ◆ List of 7 days ● Maximum claim in week ◆ Input number ",
    },
  ];

  const handleDetails = (item) => {
    setDetails(item);
    setModal(true);
  }


  return (
    <div className="promotion-area-start">
      <div className="container-fluid">
        <div className="row">
          {promotions?.map((item, index) => (
            <div className="col-md-3 my-3" key={`item_${index}`}>
              <div
                className="single-goal-section"
                style={{
                  background: `url(${item?.image}) no-repeat center center/cover`,
                  cursor: "pointer",
                }}
                onClick={() => handleDetails(item)}
              >
                <h1>{item?.header}</h1>
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <h4>{item?.amount}</h4>
                  <FaArrowRightLong />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        show={modal}
        onHide={() => setModal(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{details?.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <div className="promotion-contents">
              <img
                src={details?.image}
                alt={details?.title}
                width={"100%"}
                height={"200px"}
                layout="responsive"
                style={{ objectFit: "cover" }}
              />
              <h6 className="my-2">{details?.title}</h6>
              <div dangerouslySetInnerHTML={{ __html: details?.details }}></div>

              <button className="tramcard-claim-btn df-btn mt-2">
                Claim Now (300.00 BDT)
              </button>
            </div>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Promotion;
