"use client"
import React, { useEffect, useRef, useState } from "react";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import RadioField from "../Form/RadioField";
import { useDispatch, useSelector } from "react-redux";
import BetSlipItem from "./BetSlipItem";
import InputField from "../Form/InputField";
import { FaFile, FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { GoTrash } from "react-icons/go";
import { clearBetSlip } from "@/store/reducers/betSlipReducer";
import Cookies from "js-cookie";
import Link from "next/link";
const BetSlip = () => {
  const dispatch = useDispatch();
  const isAuthenticate = Cookies.get("token");
  const betSlip = useSelector((state) => state.betSlipReducer);
  const { bets } = betSlip;
  const innerRef = useRef(null);
  const [initialValues, setInitialValues] = useState({
    bet_type: "1",
    bet_balance_type: "1",
    stake_amount: new Array(bets?.length || 0).fill(0),
    final_stake_amount: 0,
  });

  const validationSchema = Yup.object({
    bet_type: Yup.string().required(""),
    bet_balance_type: Yup.string().required(""),
    stake_amount: Yup.array()
      .of(
        Yup.string()
          .required("Required")
          .matches(/^\d+(?:\.\d+)?$/, "Only Number")
      )
      .required("Required"),
  });

  // Value reset and goes to 10
  useEffect(() => {
    const prevLength = initialValues.stake_amount.length;
    if (bets.length > prevLength) {
      const newStakeAmount = Array.from({ length: bets.length }).fill(0);
      newStakeAmount[bets.length - 1] = 0;
      setInitialValues((prevValues) => ({
        ...prevValues,
        stake_amount: newStakeAmount,
      }));
    }
  }, [bets]);

  // Change final_stake_amount and goes to all stake_amount change
  const handleFinalStakeChange = (event) => {
    const newFinalStake = event.target.value;
    const newStakeAmount = new Array(bets?.length || 0).fill(newFinalStake);
    setInitialValues((prevValues) => ({
      ...prevValues,
      final_stake_amount: newFinalStake,
      stake_amount: newStakeAmount,
    }));
  };

  // Remove all bets when clicked trashed icon
  const handleRemoveAllBets = () => {
    dispatch(clearBetSlip([]));
  };

  return (
    <div className="betslip-container p-2 text-center">
      <Formik
        innerRef={innerRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values }) => (
          <FormikForm>
            <>
              <div className="bet-types-button mb-2 d-flex align-items-center gap-2 justify-content-center">
                <RadioField
                  label="Single bet"
                  id="single_bet"
                  name="bet_type"
                  value="1"
                />
                <RadioField
                  label="Multiple bet"
                  id="multiple_bet"
                  name="bet_type"
                  value="2"
                />
              </div>
              <div className="bet-types-button bet-balance-buttons d-flex align-items-center gap-2 justify-content-center">
                <RadioField
                  label="Deposit (9000.00)"
                  id="deposit_btn"
                  name="bet_balance_type"
                  value="1"
                />
                <RadioField
                  label="Bonus (100.00)"
                  id="bonus_btn"
                  name="bet_balance_type"
                  value="2"
                />
                <RadioField
                  label="Tramcard (100.00)"
                  id="tramcard_btn"
                  name="bet_balance_type"
                  value="3"
                />
              </div>
              {/* {JSON.stringify(values)} */}
              <div className="bet-slip-best-show">
                {bets?.length > 0 ? (
                  bets?.map((item, index) => (
                    <BetSlipItem
                      key={index}
                      index={item?.id}
                      toImage={""}
                      toName={item?.toName}
                      market={item?.market}
                      oddsName={item?.oddsName}
                      value={item?.value}
                      isLive={item?.isLive}
                      twImage={""}
                      twName={item?.twName}
                      stakeInput={
                        <InputField
                          name={`stake_amount[${index}]`}
                          type="number"
                          min={0}
                          defaultValue={0}
                        />
                      }
                      returnAmount={Number(
                        Number(
                          values?.stake_amount?.length > 0
                            ? values?.stake_amount[index]
                            : 0
                        ) * Number(item?.value) ?? 0
                      ).toFixed(2)}
                      betType={values?.bet_type}
                    />
                  ))
                ) : (
                  <div className="no-slip-item-found d-flex align-items-center justify-content-center flex-column gap-3">
                    <FaFile style={{ fontSize: 100, opacity: 0.4 }} />
                    No bet selected right now
                  </div>
                )}
              </div>

              <div className="bet-slip-final-bet betslip-single-bet-item mt-2">
                {/* <>
                  {isAuthenticate ? (
                    <div>
                      <h6 className="df-font">{`Singles (  ${bets?.length} )`}</h6>
                      <div className="bet-slip-stake-amount d-flex align-items-center justify-content-between gap-2 mt-2">
                        <div className="return-amount">
                          Return BDT :{" "}
                          {values?.bet_type === "1"
                            ? Number(
                                bets?.reduce(
                                  (acc, ele) => acc + Number(ele.value),
                                  0
                                ) *
                                  Number(
                                    values?.final_stake_amount > 0
                                      ? values?.final_stake_amount
                                      : 0
                                  ) || 0
                              ).toFixed(2)
                            : Number(
                                bets?.reduce(
                                  (acc, ele) => acc * Number(ele.value),
                                  1
                                ) *
                                  Number(
                                    values?.final_stake_amount > 0
                                      ? values?.final_stake_amount
                                      : 0
                                  )
                              ).toFixed(2)}
                        </div>
                        <div className="bet-slip-stake d-flex align-items-center gap-2 ">
                          <div className="stake-text">STAKE: </div>
                          <InputField
                            name={`final_stake_amount`}
                            type="number"
                            value={
                              bets?.length > 0 ? values.final_stake_amount : 0
                            }
                            onChange={handleFinalStakeChange}
                            min={0}
                            disabled={!bets?.length}
                          />
                        </div>
                      </div>
                      <div className="bet-slip-submit-button d-flex align-items-center justify-content-between gap-2">
                        <div className="bet-trash-btn">
                          <GoTrash onClick={handleRemoveAllBets} />
                        </div>
                        <div className="bet-submit-btn container-fluid p-0 mt-2">
                          <Button className="btn-sm container-fluid df-font p-2">
                            PLACE BET
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-3 justify-content-center">
                      <Link
                        href="/auth/login"
                        className="df-btn bg-shadow text-decoration-none df-bg reg-btn"
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth/register"
                        className="df-btn bg-shadow text-decoration-none df-bg reg-btn"
                      >
                        Complete Register
                      </Link>
                      <Link
                        href="/auth/one-click"
                        className="df-btn bg-shadow text-decoration-none df-bg reg-btn"
                      >
                        Quick Registration
                      </Link>
                    </div>
                  )}
                </> */}
              </div>
            </>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default BetSlip;
