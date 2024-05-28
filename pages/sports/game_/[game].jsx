"use client";
import BetSlip from "@/components/Bets/BetSlip";
import OddsButton from "@/components/Bets/OddsButton";
import Card from "@/components/Card";
import { API_HOST, notify } from "@/components/Helper";
import Commentaries from "@/components/Sports/Commentaries";
import CricketSquads from "@/components/Sports/CricketSquads";
import Innings from "@/components/Sports/Innings";
import Lineups from "@/components/Sports/Lineups";
import MatchInfo from "@/components/Sports/MatchInfo";
import OddsDisplay from "@/components/Sports/OddsDisplay";
import Wickets from "@/components/Sports/Wickets";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner, Tab, Tabs, Col, Nav, Row } from "react-bootstrap";

const GameDetails = () => {
  const route = useRouter();
  const {
    query: { cat, league, match },
  } = route;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [squadLoader, setSquadLoader] = useState(true);
  const [squadsData, setSquadsData] = useState([]);
  const [seriesLoader, setSeriesLoader] = useState(true);
  const [seriesData, setSeriesData] = useState([]);

  const fetchGameDetails = async () => {
    const endpoint = `${API_HOST}/getodds/soccer?cat=${cat}_10&league=${league}&match=${match}&json=1`;
    await axios
      .get(endpoint)
      .then((response) => {
        if (response?.status == 200) {
          setDetails(response?.data?.scores?.categories[0]);
          setLoading(false);
        }
      })
      .catch((errors) => {
        notify("error", "Something went wrong.");
        setLoading(false);
      });
  };

  useEffect(() => {
    
    if(cat && league && match){
      const interValId = setInterval(() => {
        
      fetchGameDetails();
      }, 60000);
      return () => clearInterval(interValId);
    }
  }, [cat,league,match]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="game-details-center">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner />
              </div>
            ) : (
              <>
                <div
                  className="cricket-tabs-area mb-2"
                  style={{ background: `#25365F` }}
                >
                  {Array.isArray(details?.matches) &&
                  details?.matches?.length > 0 ? (
                    <Card
                      header={`Game ${details?.matches[0]?.status} | Start time: ${details?.matches[0]?.time} | ${details?.name} | ${details?.matches[0]?.date}`}
                      bg="transparent"
                    >
                      <div className="d-flex align-items-center gap-5">
                        <div className="team-specification">
                          <h6 className="df-font mb-2">Local team:</h6>
                          <h6 className="df-font mb-2 d-flex gap-2">
                            {details?.matches[0]?.localteam?.name}
                            <span>
                              (
                              {details?.matches[0]?.localteam?.totalscore
                                ? details?.matches[0]?.localteam?.totalscore
                                : "0/0"}
                              )
                            </span>
                          </h6>
                        </div>
                        <div className="team-specification">
                          <h6 className="df-font mb-2">Visitor team:</h6>
                          <h6 className="df-font mb-2 d-flex gap-2">
                            {details?.matches[0]?.awayteam?.name}
                            <span>
                              (
                              {details?.matches[0]?.awayteam?.totalscore
                                ? details?.matches[0]?.awayteam?.totalscore
                                : "0/0"}
                              )
                            </span>
                          </h6>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    ""
                  )}
                </div>

                <div className="cricket-odds-show">
                  {Array.isArray(details?.matches) &&
                  details?.matches?.length > 0 ? (
                    <OddsDisplay details={details} cat={cat} />
                  ) : (
                    "No Data found right now"
                  )}
                </div>
              </>
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
};

export default GameDetails;
