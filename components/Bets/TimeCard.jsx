import React from 'react'
import { AiOutlinePlayCircle } from "react-icons/ai";

const TimeCard = ({status, date}) => {
  return (
    <div className="time-card-area text-center font-9">
      <AiOutlinePlayCircle style={{ fontSize: '17px', color: status ? 'red' : '' }} />
      <div className="is-live-check">{status}</div>
      <div className="bet-time-show">{date}</div>
    </div>
  );
}

export default TimeCard