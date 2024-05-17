import React, { useCallback, useEffect, useState } from 'react'
import { API_HOST, SEASON } from '../Helper';
import axios from 'axios';
import CricketBetCard from '../Bets/CricketBetCard';
import { Spinner } from 'react-bootstrap';

const HomePageSports = () => {
   const [odds, setOdds] = useState([]);
   const [oddsLoading, setOddsLoading] = useState(true);


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
      <h5 className="font-14 mb-2">Favourite games</h5>
      <div className="row">
        {oddsLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <Spinner />
          </div>
        ) : (
          <>
            {odds?.map((odd, oddIndex) => (
              <div className="col-md-3 mb-4" key={`bet_card_${oddIndex}`}>
                <CricketBetCard
                  data={odd}
                  href={`/sports/game/${odd?.match?.id}?cat=cricket&sub=${odd?.id}&league=${odd?.id}&match=${odd?.match?.id}&series=${odd?.series_file}&squads=${odd?.squads_file}&localteam=${odd?.match?.localteam?.id}&visitorteam=${odd?.match?.visitorteam?.id}`}
                  category={"cricket"}
                  subCategories={""}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}


export default HomePageSports