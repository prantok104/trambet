import { addBetToSlip, removeBetFromSlip } from "@/store/reducers/betSlipReducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OddsButton = ({ odds }) => {
  const dispatch = useDispatch();
  const betSlipReducer = useSelector((state) =>state.betSlipReducer);
  console.log(betSlipReducer);
  const [isClicked, setIsClicked] = useState(
    !!betSlipReducer.bets.find((bet) => bet.id === odds?.id)
  );
  const handleAddToBetSlip = (event) => {
    event.preventDefault();
    setIsClicked(!isClicked);
    if (!isClicked) {
      dispatch(addBetToSlip(odds));
    } else {
      const betRemove = betSlipReducer?.bets.find((bet) => bet.id == odds?.id);
      if (betRemove) {
        dispatch(removeBetFromSlip(0));
      }
    }
  };

  return (
    <div className="single-odds-btn">
      <button
        className={`bet-odds-button ${isClicked ? "active-odds-button" : ""}`}
        onClick={handleAddToBetSlip}
      >
        {odds?.value}
      </button>
      <div className={`odds-btn-title ${isClicked ? 'active' : ''}`}>{odds?.title}</div>
    </div>
  );
};

export default OddsButton;
