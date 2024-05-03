import React from 'react'
import { AiOutlinePlayCircle } from "react-icons/ai";

const TimeCard = ({isLive=true, date="09 Mar, 02:50"}) => {
  return (
    <div className="time-card-area text-center font-9">
      <AiOutlinePlayCircle style={{ fontSize: '17px', color: isLive ? 'red' : '' }} />
      <div className="is-live-check">{isLive ? "Live now" : "Start on"}</div>
      <div className="bet-time-show">{date}</div>
    </div>
  );
}

export default TimeCard