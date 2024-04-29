import React from 'react'
import ImageCard from './ImageCard'
import TimeCard from './TimeCard';
import Link from 'next/link';
import OddsButton from './OddsButton';

const BetCard = () => {
  return (
    <div className="single-bet-card ">
      <Link href="/" className="p-3 bg-shadow df-radius">
        <div className="bet-card-area-start">
          <div className="bet-card-header d-flex align-items-center justify-content-between gap-2">
            <ImageCard />
            <TimeCard />
            <ImageCard />
          </div>
          <div className="bet-card-body mt-3">
            <div className="bet-odds-button-area d-flex gap-2">
              <OddsButton odds={{ value: 2.5 }} />
              <OddsButton odds={{ value: 2.5 }} />
              <OddsButton odds={{ value: 2.5 }} />
              <OddsButton odds={{ value: 2.5 }} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BetCard