import React, { useCallback, useEffect, useState } from 'react'
import { API_HOST, SEASON, notify } from '../Helper';
import axios from 'axios';
import CricketBetCard from '../Bets/CricketBetCard';
import { Spinner } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const HomePageSports = () => {
   const [odds, setOdds] = useState([]);
   const [oddsLoading, setOddsLoading] = useState(true);
   var defaultSettings = {
     dots: false,
     infinite: true,
     speed: 500,
     slidesToShow: 4,
     slidesToScroll: 1,
     arrows: false,
    //  autoplay:true
   };

   const effect = useCallback(async () => {
      await fetchSportsData();
   }, []);

   const fetchSportsData = async () => {
         await axios
        .get(`${API_HOST}/cricket/schedule1?json=1`)
        .then((response) => {
         const modify = response?.data?.fixtures?.category?.filter((item) => item?.match?.matchinfo?.info[0]?.value != '' || item?.match?.odds != null)
         
          setOdds(modify?.slice(0, 8));
          setOddsLoading(false);
        })
        .catch((error) => {
          notify("error", "No Cricket match found.");
          setOdds([]);
        });
    };

    useEffect(() => {
      effect();
    }, [effect])


  return (
    <div>
      <h5 className="font-14 mb-2">Favourite gamess</h5>
      <div className="row">
        {oddsLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <Spinner />
          </div>
        ) : (
          <>
            <Slider {...defaultSettings} className="space-item-slider">
              {odds?.map((odd, oddIndex) => (
                <div className="col-md-3" key={`bet_card_${oddIndex}`}>
                  <div style={{ margin: '0 5px' }}>
                    <CricketBetCard
                      data={odd}
                      href={`/sports/game/${odd?.match?.id}?cat=cricket&sub=${odd?.id}&league=${odd?.id}&match=${odd?.match?.id}&series=${odd?.series_file}&squads=${odd?.squads_file}&localteam=${odd?.match?.localteam?.id}&visitorteam=${odd?.match?.visitorteam?.id}`}
                      category={"cricket"}
                      subCategories={""}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </>
        )}
      </div>
    </div>
  );
}


export default HomePageSports