import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import TimeCard from "./TimeCard";
import Link from "next/link";
import OddsButton from "./OddsButton";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import axios from "axios";

const BetCardLive = (props) => {
  // console.log("props", props);
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
    setSelectedBookmakerOdds(selectedBookmaker?.odds || []);
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  // const fetchTeamLogo = async() => {
  //   await axios.get("http://data2.goalserve.com:8084/api/v1/logotips/soccer/teams?k=ef2762546f6a447cc37608dc6b5e7b62&ids=9002,9240",{headers: {"Access-Control-Allow-Origin": "*"}
  //   }).then((response) => {
  //     console.log(response);
  //   } ).catch((error) => {
  //     console.log(error);
  //   } )
  // }

  useEffect(() => {
    // fetchTeamLogo();
  }, []);
  return (
    <div className="single-bet-card ">
      <Link href={props?.href} className="p-3 bg-shadow df-radius">
        <div className="bet-card-area-start">
          <div className="bet-card-header d-flex align-items-center justify-content-between gap-2">
            <ImageCard team={props?.data?.localteam} category={props?.category}/>
            <TimeCard
              status={props?.data?.status}
              date={(props?.data?.date || "") + " " + (props?.data?.time || "")}
            />
            <ImageCard team={props?.data?.awayteam || props?.data?.visitorteam} />
          </div>
          <div className="bet-card-body">
            {/* <div className="bet-card-odds-markets">
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
            </div> */}
            <div className="bet-card-odds-area">
              {/* <Slider {...defaultSettings}>
                {selectedBookmakerOdds.map((odd, index) => (
                  <OddsButton
                    key={index}
                    odds={{
                      id: index,
                      title: odd.name,
                      value: odd.value,
                    }}
                  />
                ))}
              </Slider> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BetCardLive;
