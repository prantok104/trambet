"use client";
import Card from "@/components/Card";
import { checkAPI, getDepositBonus } from "@/services/common";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaArrowRightLong } from "react-icons/fa6";
import Loader from "@/components/Loader";
import ConstantData from "@/components/ConstantData";
import { useRouter } from "next/router";
const Promotion = () => {
  const navigate = useRouter();
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);

  const effect = useCallback(async () => {
    await fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    setLoading(true);
    const responseData = await getDepositBonus();
    if (responseData?.status == true) {
      setLoading(false);
      setPromotions(responseData?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    effect();
  }, [effect]);

  const handleDetails = (item) => {
    setDetails(item);
    setModal(true);
  };

  const handleDeposit = (id) => {
    navigate.replace({
      pathname: "/user/deposit",
      query: { bonus: id },
    });
  };

  const imageUrl = ConstantData.DEPOSIT_BONUS_IMAGE_URL;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="promotion-area-start">
          <div className="container-fluid">
            <div className="row">
              {promotions?.map((item, index) => (
                <div className="col-md-3 my-3" key={`item_${index}`}>
                  <div
                    className="single-goal-section"
                    style={{
                      background: `url(${imageUrl}${item?.file}) no-repeat center center/cover`,
                      cursor: "pointer",
                    }}
                    onClick={() => handleDetails(item)}
                  >
                    <h1>
                      Deposit bonus {item?.max_bonus} BDT on{" "}
                      {item?.bonus_type == "days"
                        ? item?.days
                        : item?.providers + " Providers"}{" "}
                      with {item?.deposit_percentage}%
                    </h1>
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      <h4>{item?.max_bonus}BDT</h4>
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
                    src={`${imageUrl}${details?.file}`}
                    alt={details?.title}
                    width={"100%"}
                    height={"200px"}
                    layout="responsive"
                    style={{ objectFit: "cover" }}
                  />
                  <h6 className="my-2">{details?.title}</h6>
                  <div>
                    <ul>
                      <li>
                        Bonus {details?.deposit_percentage}% percentage of
                        deposit amount
                      </li>
                      <li>Rule 1: Wager need to {details?.wager}</li>
                      <li>Rule 2: Rollover need to {details?.rollover}</li>
                      <li>
                        Rule 3: Minimum {details?.minimum_bet} bets selection in
                        a multibet
                      </li>
                      <li>
                        Rule 4: Minimum {details?.odd_selection} bets selection
                        in a multibet
                      </li>
                      <li>
                        Minimum bonus will be adjust {details?.min_bonus}BDT
                      </li>
                      <li>
                        Maximum bonus will be adjust {details?.max_bonus}BDT
                      </li>
                      <li>
                        Bonus claim {details?.maximum_claim_in_day} in a day
                      </li>
                      <li>Bonus Expired on {details?.valid_time} days</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleDeposit(details?.id)}
                    className="tramcard-claim-btn df-btn mt-2"
                  >
                    Claim with deposit
                  </button>
                </div>
              </Card>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Promotion;
