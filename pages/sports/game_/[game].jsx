"use client";
import BetSlip from "@/components/Bets/BetSlip";
import Card from "@/components/Card";
import { API_HOST } from "@/components/Helper";
import OddsDisplay from "@/components/Sports/OddsDisplay";
import FeatureOddButton from "@/components/Bets/FeatureOddButton";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner, Tab, Tabs, Col, Nav, Row } from "react-bootstrap";
import oddsData from "@/public/odds.json";
import { FaRegStar } from "react-icons/fa6";
const GameDetails = () => {
  const route = useRouter();
  const {
    query: { cat, league, match },
  } = route;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [leagues, setLeagues] = useState([]);

  const fetchGameDetails = async () => {
    const endpoint = `${API_HOST}/getodds/soccer?cat=${cat}_10&league=${league}&json=1`;
    await axios
      .get(endpoint)
      .then((response) => {
        if (response?.status == 200) {
          setLeagues(response?.data?.scores?.categories);
          if (
            Array.isArray(response?.data?.scores?.categories) &&
            response?.data?.scores?.categories?.length > 0
          ) {
            const detailsData =
              response?.data?.scores?.categories[0]?.matches?.findIndex(
                (item) => item?.id == match
              );
            if (detailsData >= 0) {
              setDetails(
                response?.data?.scores?.categories[0]?.matches[detailsData]
              );
            } else {
              setDetails({});
            }
          } else {
            setDetails({});
          }

          setLoading(false);
        }
      })
      .catch((errors) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (cat && league && match) {
      const interValId = setInterval(() => {
        fetchGameDetails();
      }, 32000);
      return () => clearInterval(interValId);
    }
  }, [cat, league, match]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <div className="leagues-all-data">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner />
              </div>
            ) : (
              <>
                {leagues?.length > 0 && (
                  <>
                    <div
                      className="cricket-tabs-area mb-2"
                      style={{ background: `#25365F` }}
                    >
                      <Card header={`Category : ${cat}`} bg="transparent">
                        {leagues?.length > 0 ? leagues[0]?.name : ""}
                      </Card>
                    </div>
                    <div className="related-games-show">
                      {leagues[0]?.matches?.map((le, leIndex) => (
                        <div key={leIndex} className="single-game-item mb-2">
                          <h5 className="df-font leagues-header">
                            <FaRegStar style={{ marginTop: "-5px" }} />{" "}
                            {`${le?.localteam?.name} VS ${le?.awayteam?.name}`}
                          </h5>
                          <div className="d-flex align-items-center jsutify-content-between details-league-data">
                            {Array.isArray(le?.odds) &&
                              le?.odds?.length > 0 &&
                              le?.odds[0]?.bookmakers[0]?.odds?.map(
                                (odd, oddIndex) => (
                                  <FeatureOddButton
                                    key={oddIndex}
                                    odds={{
                                      category: cat,
                                      league: leagues?.length > 0 ?  leagues[0]?.name : 'Unknown',
                                      matchId: le?.id,
                                      id: `rand_${le?.id}_${Math.random(1, 9)}`,
                                      bookmarkId:
                                        le?.odds[0]?.bookmakers[0]?.id,
                                      odd_details:
                                        le?.odds[0]?.bookmakers[0]?.odds,
                                      title: odd.name,
                                      value: odd.value,
                                      toName: le?.localteam?.name,
                                      twName: le?.awayteam?.name,
                                      isLive:
                                        le?.status == "In progress"
                                          ? "LIVE"
                                          : "Upcoming",
                                      market: le?.odds[0]?.bookmakers[0]?.name,
                                      oddsName: odd.name,
                                      disable:
                                        odd?.stop == "True" ? true : false,
                                    }}
                                  />
                                )
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* {JSON.stringify(leagues)} */}
              </>
            )}
          </div>
        </div>
        <div className="col-md-5">
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
                  <Card
                    header={`Game ${details?.status} | Start time: ${details?.time} | ${details?.name} | ${details?.date}`}
                    bg="transparent"
                  >
                    <div className="d-flex align-items-center gap-5">
                      <div className="team-specification">
                        <h6 className="df-font mb-2">Local team:</h6>
                        <h6 className="df-font mb-2 d-flex gap-2">
                          {details?.localteam?.name}
                          <span>
                            (
                            {details?.localteam?.totalscore
                              ? details?.localteam?.totalscore
                              : "0/0"}
                            )
                          </span>
                        </h6>
                      </div>
                      <div className="team-specification">
                        <h6 className="df-font mb-2">Visitor team:</h6>
                        <h6 className="df-font mb-2 d-flex gap-2">
                          {details?.awayteam?.name}
                          <span>
                            (
                            {details?.awayteam?.totalscore
                              ? details?.awayteam?.totalscore
                              : "0/0"}
                            )
                          </span>
                        </h6>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="cricket-odds-show">
                  <OddsDisplay
                    details={details}
                    cat={cat}
                    league={leagues?.length  > 0 ? leagues[0]?.name : 'unknown'}
                  />
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
