import React, { useState } from "react";
import ImageCard from "./ImageCard";
import TimeCard from "./TimeCard";
import Link from "next/link";
import OddsButton from "./OddsButton";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const CricketBetCard = (props) => {
  const [oddsMarket, setOddsMarket] = useState("");
  const defaultSettings = {
    className: "slider",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    prevArrow: <FaAngleLeft />,
    nextArrow: <FaAngleRight />,
  };

  const handleOddsMarketChange = (event) => {
    event.preventDefault();
    setOddsMarket(event?.target?.value);
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };
  return (
    <div className="single-bet-card bg-shadow " style={{ minHeight: "190px" }}>
      <Link
        href={props?.href}
        className="py-3 px-2 bg-shadow df-radius"
        style={{ minHeight: "190px" }}
      >
        <div className="bet-card-area-start">
          <div className="bet-card-header d-flex align-items-center justify-content-between gap-2">
            <ImageCard team={props?.data?.match?.localteam} />
            <TimeCard
              status={
                props?.data?.match?.matchinfo?.info[0]?.value
                  ? "Live Now"
                  : "Upcoming"
              }
              date={
                (props?.data?.match?.date || "") +
                " " +
                (props?.data?.match?.time || "")
              }
            />
            <ImageCard team={props?.data?.match?.visitorteam} />
          </div>
          <div className="bet-card-body">
            <div className="bet-card-odds-markets">
              <span className="text-center d-block">
                {props?.data?.match?.match_num}
              </span>
            </div>
            <div className="bet-card-odds-area">
              <strong className="text-center d-block">
                {props?.data?.match?.matchinfo?.info[0]?.name} :{" "}
                {props?.data?.match?.matchinfo?.info[0]?.value
                  ? props?.data?.match?.matchinfo?.info[0]?.value
                  : "Match will be start"}
              </strong>
            </div>

            {Array.isArray(props?.data?.match?.odds?.type) ? (
              <div className="bet-card-odds-area px-3 mt-2">
                <Slider {...defaultSettings}>
                  {props.data.match?.odds?.type[0].bookmaker?.odd?.map(
                    (odd, index) => (
                      <OddsButton
                        key={index}
                        odds={{
                          category: "cricket",
                          league: props?.data?.name,
                          matchId: props?.data?.match?.id,
                          id: odd?.id,
                          bookmarkId:
                            props.data.match?.odds?.type[0].bookmaker?.id,
                          odd_details:
                            props.data.match?.odds?.type[0].bookmaker?.odd,
                          title: odd.name,
                          value: odd.value,
                          toName: props.data.match?.localteam?.name,
                          twName: props.data.match?.visitorteam?.name,
                          isLive: odd?.match?.matchinfo?.info[0]?.value
                            ? "LIVE"
                            : "Upcoming",
                          market:
                            props.data.match?.odds?.type[0].bookmaker?.name,
                          oddsName: odd.name,
                          disable: odd?.stop == "True" ? true : false,
                        }}
                      />
                    )
                  )}
                </Slider>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CricketBetCard;
