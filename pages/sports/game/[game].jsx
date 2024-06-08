"use client";
import BetSlip from "@/components/Bets/BetSlip";
import Card from "@/components/Card";
import {
  API_HOST,
  API_KEY,
  DATA_SERVER,
  SEASON,
  notify,
} from "@/components/Helper";
import Commentaries from "@/components/Sports/Commentaries";
import CricketSquads from "@/components/Sports/CricketSquads";
import Innings from "@/components/Sports/Innings";
import Lineups from "@/components/Sports/Lineups";
import MatchInfo from "@/components/Sports/MatchInfo";
import OddsBookmark from "@/components/Sports/OddsBookmark";
import Wickets from "@/components/Sports/Wickets";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import FeatureOddButton from "../../../components/Bets/FeatureOddButton";

const GameDetails = () => {
  const route = useRouter();
  const {
    query: { cat, sub, league, match, series, squads, localteam, visitorteam },
  } = route;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [squadLoader, setSquadLoader] = useState(true);
  const [squadsData, setSquadsData] = useState([]);
  const [seriesLoader, setSeriesLoader] = useState(true);
  const [seriesData, setSeriesData] = useState([]);
  const [oddsLoader, setOddsLoader] = useState(true);
  const [odds, setOdds] = useState({});
  const [subcategories, setSubcategories] = useState([]);
  const [categoryLoader, setCategoryLoader] = useState(true);
  const [leagueImage, setLeagueImage] = useState({});
  const [showSubMenu, setShowSubMenu] = useState(true);
  const [allData, setAllData] = useState([]);

  const effect = useCallback(async () => {
    if (cat == "cricket") {
      await fetchLeagueImage();
      await fetchCricketOdds();
      await fetchCricketLive();
      await fetchTeamSquads();
    }
  }, [cat]);

  // Fetch Odds data
  const fetchCricketOdds = async () => {
    const endpoint = `${API_HOST}/getodds/soccer?cat=cricket_10&json=1`;
    await axios
      .get(endpoint)
      .then((response) => {
        if (response?.status == 200) {
          setAllData(response?.data?.scores?.category)
          setOdds(
            response?.data?.scores?.category?.filter(
              (item) => item?.matches?.match?.id == match
            )?.[0] ?? {}
          );
          setOddsLoader(false);
        }
      })
      .catch((errors) => {
        // console.log(errors);
        setOddsLoader(false);
      });
  };

  // Fetch Live details data
  const fetchCricketLive = async () => {
    const endpoint = `${API_HOST}/cricket/livescore?json=1`;
    await axios
      .get(endpoint)
      .then((response) => {
        if (response?.status == 200) {
          setDetails(
            response?.data?.scores?.category?.filter(
              (item) => item?.match?.id == match
            )?.[0] ?? {}
          );

          setLoading(false);
        }
      })
      .catch((errors) => {
        // notify("error", "Something went wrong.");
        setLoading(false);
      });
  };

  // Fetch Team Squads data
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
        // console.log(errors);
        setSquadLoader(false);
      });
  };

  // Fetch league image
  const fetchLeagueImage = async () => {
    const endpoint = `${DATA_SERVER}/cricket/leagues?k=${API_KEY}&ids=${league}?json=1`;
    await axios
      .get(endpoint)
      .then((response) => {
        if (response?.status == 200) {
          // console.log(response);
          setLeagueImage(response?.data);
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  };



  useEffect(() => {
    effect();
  }, [effect]);

  useEffect(() => {
    if (cat === "cricket") {
      const intervalId = setInterval(() => {
        fetchCricketOdds();
        fetchCricketLive();
      }, 60000);
      return () => clearInterval(intervalId);
    }
  }, [cat, fetchCricketLive]);

  // Submenu view
  const handleSubmenuView = () => {
    setShowSubMenu((prevState) => !prevState);
  };



  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <div className="game-details-left-sidebar">
            {oddsLoader ? (
              <div className="spinner d-flex align-items-center justify-content-center">
                <Spinner />
              </div>
            ) : (
              <>
                {allData?.length > 0 && (
                  <>
                    <div
                      className="cricket-tabs-area mb-2"
                      style={{ background: `#25365F` }}
                    >
                      <Card header={`Category : Cricket`} bg="transparent">
                        Choose and play the game.
                      </Card>
                    </div>

                    <div className="related-games-show">
                      {allData?.map((c, cIndex) => (
                        <div key={cIndex} className="single-game-item mb-2">
                          <h5 className="df-font leagues-header">
                            <FaRegStar style={{ marginTop: "-5px" }} />{" "}
                            {`${c?.matches?.match?.localteam?.name} VS ${c?.matches?.match?.visitorteam?.name}`}
                          </h5>

                          <div className="d-flex align-items-center jsutify-content-between details-league-data">
                            {Array.isArray(
                              c?.matches?.match?.odds?.type[0]?.bookmaker
                            )
                              ? c?.matches?.match?.odds?.type[0]?.bookmaker[0]?.odd?.map(
                                  (_i, _iIndex) => (
                                    <FeatureOddButton
                                      key={_iIndex}
                                      odds={{
                                        category: "Cricket",
                                        league: c?.name,
                                        matchId: c?.matches?.match?.id,
                                        id: `rand_${
                                          c?.matches?.match?.id
                                        }_${Math.random(1, 9)}`,
                                        bookmarkId:
                                          c?.matches?.match?.odds?.type[0]
                                            ?.bookmaker[0]?.id,
                                        odd_details:
                                          c?.matches?.match?.odds?.type[0]
                                            ?.bookmaker[0]?.odd,
                                        title: _i.name,
                                        value: _i.value,
                                        toName:
                                          c?.matches?.match?.localteam?.name,
                                        twName:
                                          c?.matches?.match?.visitorteam?.name,
                                        isLive:
                                          c?.matches?.match?.matchinfo?.info[0]
                                            ?.value !== ""
                                            ? "LIVE"
                                            : "Upcoming",
                                        market:
                                          c?.matches?.match?.odds?.type[0]
                                            ?.bookmaker[0]?.name,
                                        oddsName: _i.name,
                                        disable:
                                          _i?.stop == "True" ? true : false,
                                      }}
                                    />
                                  )
                                )
                              : c?.matches?.match?.odds?.type[0]?.bookmaker?.odd?.map(
                                  (_i, Index) => (
                                    <FeatureOddButton
                                      key={Index}
                                      odds={{
                                        category: "Cricket",
                                        league: c?.name,
                                        matchId: c?.matches?.match?.id,
                                        id: `rand_${
                                          c?.matches?.match?.id
                                        }_${Math.random(1, 9)}`,
                                        bookmarkId:
                                          c?.matches?.match?.odds?.type[0]
                                            ?.bookmaker?.id,
                                        odd_details:
                                          c?.matches?.match?.odds?.type[0]
                                            ?.bookmaker?.odd,
                                        title: _i.name,
                                        value: _i.value,
                                        toName:
                                          c?.matches?.match?.localteam?.name,
                                        twName:
                                          c?.matches?.match?.visitorteam?.name,
                                        isLive:
                                          c?.matches?.match?.matchinfo?.info[0]
                                            ?.value !== ""
                                            ? "LIVE"
                                            : "Upcoming",
                                        market:
                                          c?.matches?.match?.odds?.type[0]
                                            ?.bookmaker?.name,
                                        oddsName: _i.name,
                                        disable:
                                          _i?.stop == "True" ? true : false,
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
              </>
            )}
          </div>
        </div>
        <div className="col-md-5">
          <div
            className="cricket-details-area mb-2"
            // style={{ backgroundImage: `url('https://placehold.co/600x400')` }}
            style={{ background: `#25365F` }}
          >
            {details?.match?.type ? (
              <Card
                header={`${details?.match?.comment?.post} | Game ${details?.match?.status} | Start time: ${details?.match?.time} | ${details?.match?.type} Match | Venue: ${details?.match?.venue} | ${details?.name} | ${details?.match?.date}`}
                bg="transparent"
              >
                <div className="d-flex align-items-center gap-5">
                  <div className="team-specification">
                    <h6 className="df-font mb-2">Local team:</h6>
                    <h6 className="df-font mb-2 d-flex gap-2">
                      {details?.match?.localteam?.name}
                      <span>
                        (
                        {details?.match?.localteam?.totalscore
                          ? details?.match?.localteam?.totalscore
                          : "0/0"}
                        )
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
            {oddsLoader ? (
              <div className="spinner d-flex align-items-center justify-content-center">
                <Spinner />
              </div>
            ) : (
              <OddsBookmark
                odds={odds?.matches?.match ?? []}
                isLive={
                  details?.match?.status == "In Progress" ? "LIVE" : "Upcoming"
                }
                category={cat}
                league={odds?.name}
              />
            )}
          </div>
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
                      {details?.match?.type ? (
                        <Card
                          header={`${details?.match?.comment?.post} | Game ${details?.match?.status} | Start time: ${details?.match?.time} | ${details?.match?.type} Match | Venue: ${details?.match?.venue} | ${details?.name} | ${details?.match?.date}`}
                        >
                          <div className="d-flex align-items-center gap-5">
                            <div className="team-specification">
                              <h6 className="df-font mb-2">Local team:</h6>
                              <h6 className="df-font mb-2 d-flex gap-2">
                                {details?.match?.localteam?.name}
                                <span>
                                  (
                                  {details?.match?.localteam?.totalscore
                                    ? details?.match?.localteam?.totalscore
                                    : "0/0"}
                                  )
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
                    {details?.match?.commentaries?.commentary ? (
                      <Commentaries
                        commentaries={details?.match?.commentaries?.commentary}
                      />
                    ) : (
                      ""
                    )}
                  </Tab>
                  <Tab eventKey="squads" title="Squads">
                    {squadLoader ? (
                      <Spinner />
                    ) : (
                      <CricketSquads
                        data={squadsData?.filter(
                          (item) =>
                            item?.id == localteam || item?.id == visitorteam
                        )}
                      />
                    )}
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
};

export default GameDetails;
