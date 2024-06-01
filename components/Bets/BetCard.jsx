import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import TimeCard from "./TimeCard";
import Link from "next/link";
import OddsButton from "./OddsButton";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const BetCard = (props) => {
  const [oddsMarket, setOddsMarket] = useState("");
  const [oddsMarketList, setOddsMarketList] = useState([]);
  const [selectedBookmakerOdds, setSelectedBookmakerOdds] = useState([]);
  const defaultSettings = {
    className: "slider",
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    prevArrow: <FaAngleLeft />,
    nextArrow: <FaAngleRight />,
  };

  const handleOddsMarketChange = (event) => {
    event.preventDefault();
    const selectedBookmakerId = event?.target?.value;
    const selectedBookmaker = props.data.odds[0].bookmakers.find(
      (bookmaker) => bookmaker.id === selectedBookmakerId
    );
    setOddsMarket(selectedBookmaker);
    setSelectedBookmakerOdds(selectedBookmaker?.odds || []);
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setOddsMarketList(props.data.odds[0].bookmakers);
    setSelectedBookmakerOdds(props.data.odds[0].bookmakers[0]?.odds || []);
  }, []);
  return (
    <div className="single-bet-card ">
      <Link href={props?.href} className="p-3 bg-shadow df-radius">
        <div className="bet-card-area-start">
          <div className="bet-card-header d-flex align-items-center justify-content-between gap-2">
            <ImageCard team={props?.data?.localteam} />
            <TimeCard
              status={props?.data?.status}
              date={(props.data.date || "") + " " + (props.data.time || "")}
            />
            <ImageCard team={props?.data?.awayteam} />
          </div>
          <div className="bet-card-body">
            <div className="bet-card-odds-markets">
              <select
                className="odds-market-selection"
                onClick={preventDefault}
                onChange={handleOddsMarketChange}
                defaultValue={0}
              >
                {oddsMarketList?.map((bookmaker, index) => (
                  <option value={bookmaker.id} key={index}>
                    {bookmaker.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="bet-card-odds-area">
              <Slider {...defaultSettings}>


                {selectedBookmakerOdds.map((odd, index) => {
                  return (
                    <OddsButton
                      key={index}
                      odds={{
                        category: props?.category,
                        league: props?.subCategories,
                        bookmarkId: props?.data?.odds[0].bookmakers[0]?.id,
                        matchId: props?.matchId,
                        odd_details: props?.data?.odds[0].bookmakers[0]?.odds,
                        id: `${index}_${props?.matchId}`,
                        title: odd.name,
                        value: odd.value,
                        toName: props?.data?.localteam?.name,
                        twName: props?.data?.awayteam?.name,
                        isLive:
                          props?.data?.status == "In progress"
                            ? "LIVE"
                            : "UPCOMING",
                        market: Object.keys(oddsMarket).includes("name")
                          ? oddsMarket.name
                          : props?.data?.odds[0].bookmakers[0]?.name,
                        oddsName: odd?.name,
                        disable: odd?.stop == "True" ? true : false,
                      }}
                    />
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BetCard;
