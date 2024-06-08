import dayjs from "dayjs";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import ImageCard from "./ImageCard";
import TimeCard from "./TimeCard";
import { FaAngleLeft, FaAngleRight, FaClock } from "react-icons/fa";
import { GiCricketBat } from "react-icons/gi";
import FeatureOddButton from "./FeatureOddButton";
const FeaturedCard = (props) => {

  function findBookmakerWithDrawOdds(data) {
    if (!Array.isArray(data)) {
    } else {
      for (const item of data) {
        const odds = item.bookmaker.odd;

        if (Array.isArray(odds)) {
          const drawOdd = odds.find((odd) => odd.name === "Draw");
          if (drawOdd) {
            return item.bookmaker;
          }
        } else if (typeof odds === "object" && odds.name === "Draw") {
          return item.bookmaker;
        }
      }
      // If no 'Draw' odds are found, return the first bookmaker's odd
      return data[0].bookmaker;
    }

  }

  return (
    <div
      className={`fea-single-bet-card ${props.overlap}`}
      style={{
        minHeight: "190px",
        backgroundImage: `url(${props?.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Link href={props?.href} style={{ minHeight: "209px" }}>
        <div className="fea-card-header d-flex align-items-center justify-content-between">
          <div className="fea-times">
            <FaClock style={{ marginTop: "-2px", marginRight: "5px" }} />{" "}
            <span>
              {`${dayjs(props?.data?.match?.date, "DD-MM-YYYY").format(
                "DD MMM YYYY"
              )} | ${props?.data?.match?.time}`}
            </span>
          </div>
          <div className="fea-type">
            <span>{props?.data?.match?.type}</span>
          </div>
        </div>

        <div className="fea-card-body">
          <h6 className="p-3 group-name">
            <GiCricketBat style={{ marginRight: "5px" }} /> {props?.data?.name}
          </h6>

          <div className="bet-card-header d-flex align-items-center justify-content-between gap-2">
            <ImageCard team={props?.data?.match?.localteam} />
            <TimeCard
              status={
                props?.data?.match?.matchinfo?.info[0]?.value
                  ? "Live Now"
                  : "Upcoming"
              }
              date={props?.data?.match?.match_num || ""}
            />
            <ImageCard team={props?.data?.match?.visitorteam} />
          </div>
          <div className="bet-card-odds-area mt-3">
            <strong className="text-center d-block text-secondary">
              {props?.data?.match?.matchinfo?.info[0]?.name} :{" "}
              {props?.data?.match?.matchinfo?.info[0]?.value
                ? props?.data?.match?.matchinfo?.info[0]?.value
                : "Match will be start"}
            </strong>
          </div>

          <div className="fea-card-odds d-flex align-items-center mt-2">
            {findBookmakerWithDrawOdds(
              props?.data?.match?.odds?.type
            )?.odd?.map((odd, index) => (
              <FeatureOddButton
                key={index}
                odds={{
                  category: "cricket",
                  league: props?.data?.name,
                  matchId: props?.data?.match?.id,
                  id: odd?.id,
                  bookmarkId: props?.data?.match?.odds?.type[0].bookmaker?.id,
                  odd_details: props?.data.match?.odds?.type[0].bookmaker?.odd,
                  title: odd.name,
                  value: odd.value,
                  toName: props?.data?.match?.localteam?.name,
                  twName: props?.data?.match?.visitorteam?.name,
                  isLive: odd?.match?.matchinfo?.info[0]?.value
                    ? "LIVE"
                    : "Upcoming",
                  market: props?.data?.match?.odds?.type[0].bookmaker?.name,
                  oddsName: odd.name,
                  disable: odd?.stop == "True" ? true : false,
                }}
              />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedCard;
