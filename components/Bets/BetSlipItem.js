import React, { useEffect, useState } from 'react'
import ImageCard from './ImageCard';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeBetFromSlip } from '@/store/reducers/betSlipReducer';
import {Spinner, Placeholder, Card} from 'react-bootstrap'
const BetSlipItem = ({
  index,
  toImage,
  toName,
  market,
  oddsName,
  value,
  isLive,
  twImage,
  twName,
  stakeInput,
  returnAmount = "0.00",
  betType
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)
  const handleSlipClose = (index) => {
    dispatch(removeBetFromSlip(index));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Placeholder animation="wave">
          {/* <Placeholder.Image /> */}
          <div className="betslip-single-bet-item-center-item d-flex align-items-center justify-content-between gap-3 mt-2">
            <div className="place-start" style={{ width: "15%" }}>
              <Placeholder as="div" animation="glow">
                <Placeholder
                  xs={12}
                  className="w-100"
                  style={{ height: "12px" }}
                />
              </Placeholder>
            </div>
            <div className="place-center" style={{ width: "70%" }}>
              <Placeholder as="div" animation="glow">
                <Placeholder
                  xs={12}
                  className="w-100"
                  style={{ height: "6px", marginBottom: "8px" }}
                />
                <Placeholder
                  xs={12}
                  className="w-100"
                  style={{ height: "25px", marginBottom: "8px" }}
                />
                <Placeholder
                  xs={12}
                  className="w-100"
                  style={{ height: "12px" }}
                />
              </Placeholder>
            </div>
            <div className="place-end" style={{ width: "15%" }}>
              <Placeholder as="div" animation="glow">
                <Placeholder
                  xs={12}
                  className="w-100"
                  style={{ height: "15px", marginBottom: "8px" }}
                />
                <Placeholder
                  xs={12}
                  className="w-100"
                  style={{ height: "10px" }}
                />
              </Placeholder>
            </div>
          </div>
          {/* <Placeholder.Image /> */}
        </Placeholder>
      ) : (
        <div className="betslip-single-bet-item">
          <div className="betslip-single-bet-item-header d-flex align-items-center justify-content-between">
            <ImageCard src={toImage} alt={toName} title={toName} />
            <div className="betslip-single-bet-item-center-item">
              <h6>{market}</h6>
              <h6 className="d-flex align-items-center justify-content-center gap-2 my-1">
                <div className="slip-odds-value">{value}</div>{" "}
                <div className="check-is-live">
                  {isLive ? "Live" : "Upcoming"}
                </div>
              </h6>
              <h6>{oddsName}</h6>
            </div>
            <ImageCard src={twImage} alt={twImage} title={twName} />
          </div>
          {betType == 1 && (
            <div className="bet-slip-stake-amount  d-flex align-items-center justify-content-between gap-2 mt-2">
              <div className="return-amount">Return BDT : {returnAmount}</div>
              <div className="bet-slip-stake d-flex align-items-center gap-2 ">
                <div className="stake-text">STAKE: </div>
                {stakeInput}
              </div>
            </div>
          )}
          <button
            className="slip-close-btn"
            onClick={() => handleSlipClose(index)}
          >
            <FaTimes />
          </button>
        </div>
      )}
    </>
  );
};

export default BetSlipItem