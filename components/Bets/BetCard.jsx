import React, { useState } from 'react'
import ImageCard from './ImageCard'
import TimeCard from './TimeCard';
import Link from 'next/link';
import OddsButton from './OddsButton';
import Slider from 'react-slick';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const BetCard = () => {
  const [oddsMarket, setOddsMarket] = useState('');
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
  }
  
   const preventDefault = (event) => {
     event.preventDefault();
   };
  return (
    <div className="single-bet-card ">
      <Link href="/" className="p-3 bg-shadow df-radius">
        <div className="bet-card-area-start">
          <div className="bet-card-header d-flex align-items-center justify-content-between gap-2">
            <ImageCard />
            <TimeCard />
            <ImageCard />
          </div>
          <div className="bet-card-body">
            <div className="bet-card-odds-markets">
              <select
                className="odds-market-selection"
                onClick={preventDefault}
                onChange={handleOddsMarketChange}
                defaultValue={2}
              >
                <option value={1}>Fanduel H2h</option>
                <option value={2}>Bovada H2h</option>
              </select>
            </div>
            <div className="bet-card-odds-area">
              <Slider {...defaultSettings}>
                <OddsButton odds={{ id: 1, title: "Dundee FC", value: 3 }} />
                <OddsButton odds={{ id: 2, title: "Draw", value: 1.2 }} />
                <OddsButton odds={{ id: 3, title: "Hearts", value: 4.3 }} />
                <OddsButton
                  odds={{ id: 4, title: "Ross County", value: 12.5 }}
                />
              </Slider>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BetCard