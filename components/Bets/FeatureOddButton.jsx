import {
  addBetToSlip,
  removeBetFromSlip,
} from "@/store/reducers/betSlipReducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FeatureOddButton = ({ odds }) => {
  const dispatch = useDispatch();
  const betSlipReducer = useSelector((state) => state.betSlipReducer);
  const [isClicked, setIsClicked] = useState(
    !!betSlipReducer.bets.find((bet) => bet.id === odds?.id)
  );

  useEffect(() => {
    setIsClicked(!!betSlipReducer.bets.find((bet) => bet.id === odds?.id));
  }, [betSlipReducer.bets, odds?.id]);

  const handleAddToBetSlip = (event) => {
    event.preventDefault();
    setIsClicked(!isClicked);
    if (!isClicked) {
      dispatch(addBetToSlip(odds));
    } else {
      const betRemove = betSlipReducer?.bets.find((bet) => bet.id == odds?.id);
      if (betRemove) {
        dispatch(removeBetFromSlip(betRemove?.id));
      }
    }
  };

  return (
    <div className={`single-odds-btn fea-odd-single`}>
      <button
        className={`d-flex align-items-center justify-content-between bet-odds-button ${isClicked ? "active-odds-button" : ""} ${
          odds?.disable ? "disable-odd" : ""
        }`}
        onClick={handleAddToBetSlip}
        disabled={odds?.disable}
      >
        <div className={`odds-btn-title ${isClicked ? "active" : ""}`}>
          {odds?.title}
        </div>{" "}
        {odds?.value}
      </button>
    </div>
  );
};

export default FeatureOddButton;
