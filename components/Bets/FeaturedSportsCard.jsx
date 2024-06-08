import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import ImageCard from "./ImageCard";
import TimeCard from "./TimeCard";
import {  FaClock } from "react-icons/fa";
import FeatureOddButton from "./FeatureOddButton";
import { IoMdFootball } from "react-icons/io";
const FeaturedSportsCard = (props) => {
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
      <Link
        href={{
          pathname: props?.href
        }}
        style={{ minHeight: "209px" }}
      >
        <div className="fea-card-header d-flex align-items-center justify-content-between">
          <div className="fea-times">
            <FaClock style={{ marginTop: "-2px", marginRight: "5px" }} />{" "}
            <span>
              {`${dayjs(props?.data?.date, "DD-MM-YYYY").format(
                "DD MMM YYYY"
              )} | ${props?.data?.time}`}
            </span>
          </div>
          <div className="fea-type">
            <span>{props?.data?.status}</span>
          </div>
        </div>

        <div className="fea-card-body">
          <h6 className="py-2 px-3 group-name">
            <IoMdFootball style={{ marginTop: "-2px", marginRight: "5px" }} />{" "}
            Football / NFL
          </h6>

          <div className="bet-card-header d-flex align-items-center justify-content-between gap-2">
            <ImageCard team={props?.data?.localteam} />
            <TimeCard
              status={
                props?.data?.status == "In progress" ? "Live Now" : "Upcoming"
              }
              date={props?.data?.match?.match_num || ""}
            />
            <ImageCard team={props?.data?.awayteam} />
          </div>
          <div className="bet-card-odds-area mt-3">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 15,
                  padding: "0px 5px",
                  color: "#fff",
                  borderRadius: "3px",
                  background: "#77A2DD",
                }}
              >
                {props?.data?.localteam?.totalscore
                  ? props?.data?.localteam?.totalscore
                  : 0}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 15,
                  padding: "0px 5px",
                  color: "#fff",
                  borderRadius: "3px",
                  background: "#77A2DD",
                }}
              >
                {props?.data?.awayteam?.totalscore
                  ? props?.data?.awayteam?.totalscore
                  : 0}
              </span>
            </div>
            <strong className="text-center d-block text-secondary">
              {props?.data?.starting_pitchers?.hometeam?.name ||
              props?.data?.starting_pitchers?.awayteam?.name
                ? "In Progress"
                : "Match will be start"}
            </strong>
          </div>

          <div className="fea-card-odds d-flex align-items-center mt-2">
            {Array.isArray(props?.data?.odds)
              ? Array.isArray(props.data.odds[0]?.bookmakers)
                ? props.data.odds[0]?.bookmakers?.length > 0
                  ? props?.data?.odds[0]?.bookmakers[0].odds?.map(
                      (odd, index) => (
                        <>
                          <FeatureOddButton
                            key={index}
                            odds={{
                              category: "football_10",
                              league: "Nfl",
                              matchId: props?.data?.id,
                              id: `rand_${props?.data?.id}_${Math.random(
                                1,
                                9
                              )}`,
                              bookmarkId:
                                props?.data?.odds[0]?.bookmakers[0]?.id,
                              odd_details:
                                props?.data?.odds[0]?.bookmakers[0]?.odds,
                              title: odd.name,
                              value: odd.value,
                              toName: props?.data?.localteam?.name,
                              twName: props?.data?.awayteam?.name,
                              isLive:
                                props?.data?.status == "In progress"
                                  ? "LIVE"
                                  : "Upcoming",
                              market: props?.data?.odds[0]?.bookmakers[0]?.name,
                              oddsName: odd.name,
                              disable: odd?.stop == "True" ? true : false,
                            }}
                          />
                        </>
                      )
                    )
                  : ""
                : ""
              : ""}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedSportsCard;
