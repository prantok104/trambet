"use client"
import BetSlip from '@/components/Bets/BetSlip'
import Card from '@/components/Card';
import { API_HOST, notify } from '@/components/Helper';
import Commentaries from '@/components/Sports/Commentaries';
import CricketSquads from '@/components/Sports/CricketSquads';
import Innings from '@/components/Sports/Innings';
import Lineups from '@/components/Sports/Lineups';
import MatchInfo from '@/components/Sports/MatchInfo';
import Wickets from '@/components/Sports/Wickets';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { Spinner, Tab, Tabs } from 'react-bootstrap';

const GameDetails = () => {
const route = useRouter();
const {query: {cat, sub, league, match,series,squads,localteam,visitorteam}} = route;
const [loading, setLoading] = useState(true);
const [details, setDetails] = useState({});
const [squadLoader, setSquadLoader] = useState(true);
const [squadsData, setSquadsData] = useState([]);
const [seriesLoader, setSeriesLoader] = useState(true);
const [seriesData, setSeriesData] = useState([]);

 const effect = useCallback(async () => {
   if (cat == "cricket") {
      await fetchCricketLive();
      await fetchTeamSquads();
   }
 }, [cat]);
 const fetchCricketLive = async () => {
   const endpoint = `${API_HOST}/cricket/livescore?json=1`;
   await axios
     .get(endpoint)
     .then((response) => {
       if(response?.status == 200) {
         setDetails(
           response?.data?.scores?.category?.filter(
             (item) => item?.match?.id == match
           )?.[0] ?? {}
         );

         setLoading(false);
       }
     })
     .catch((errors) => {
         notify("error", "Something went wrong.")
         setLoading(false);
     }); 
 }

 const fetchTeamSquads = async () => {
  setSquadLoader(true);
  const endpoint = `${API_HOST}/cricketfixtures/${squads}?json=1`;
  await axios
    .get(endpoint)
    .then((response) => {
      if (response?.status == 200) {
        setSquadsData(response?.data?.squads?.category?.team);
        setSquadLoader(false);
      }
    })
    .catch((errors) => {
      console.log(errors)
      setSquadLoader(false);
    }); 
 }

 useEffect(() => {
   effect();
 }, [effect])




  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="game-details-left-sidebar">Category area</div>
        </div>
        <div className="col-md-6">
          <div className="game-details-center">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner />
              </div>
            ) : (
              <div className="cricket-tabs-area">
                <Tabs
                  defaultActiveKey="commentaries"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                >
                  <Tab eventKey="commentaries" title="Commentaries">
                    <div className="cricket-play-current-position">
                      {details?.match?.type ? 
                      <Card
                        header={`${details?.match?.comment?.post} | Game ${details?.match?.status} | Start time: ${details?.match?.time} | ${details?.match?.type} Match | Venue: ${details?.match?.venue} | ${details?.name} | ${details?.match?.date}`}
                      >
                        <div className="d-flex align-items-center gap-5">
                          <div className="team-specification">
                            <h6 className="df-font mb-2">Local team:</h6>
                            <h6 className="df-font mb-2 d-flex gap-2">
                              {details?.match?.localteam?.name}
                              <span>
                                ({details?.match?.localteam?.totalscore})
                              </span>
                            </h6>
                          </div>
                          <div className="team-specification">
                            <h6 className="df-font mb-2">Visitor team:</h6>
                            <h6 className="df-font mb-2 d-flex gap-2">
                              {details?.match?.visitorteam?.name}
                              <span>
                                (
                                {details?.match?.visitorteam?.totalscore
                                  ? details?.match?.visitorteam?.totalscore
                                  : "0"}
                                )
                              </span>
                            </h6>
                          </div>
                        </div>
                      </Card> : "" }
                    </div>
                    {details?.match?.commentaries?.commentary ? (
                      <Commentaries
                        commentaries={details?.match?.commentaries?.commentary}
                      />
                    ) : (
                      "No data found"
                    )}
                  </Tab>
                  <Tab eventKey="squads" title="Squads">
                    {squadLoader ? <Spinner /> : <CricketSquads data={squadsData?.filter(item => item?.id == localteam || item?.id== visitorteam)} />}
                  </Tab>
                  <Tab eventKey="inning" title="Innings">
                    <Innings data={details?.match?.inning} />
                  </Tab>
                  <Tab eventKey="lineups" title="Lineups">
                    <Lineups data={details?.match?.lineups} />
                  </Tab>
                  <Tab eventKey="matchinfo" title="Match Info">
                    <MatchInfo
                      title="Match info"
                      data={details?.match?.matchinfo?.info}
                    />
                  </Tab>
                  <Tab eventKey="wickets" title="Wickets">
                    <Wickets
                      title={"Wickets"}
                      data={details?.match?.wickets?.wicket}
                    />
                  </Tab>
                </Tabs>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div className="game-details-right-sidebar bg-shadow df-radius p-2">
            <BetSlip />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails