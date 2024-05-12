"use client";
import BetSlip from "@/components/Bets/BetSlip";
import Card from "@/components/Card";
import { API_HOST, notify } from "@/components/Helper";
import Commentaries from "@/components/Sports/Commentaries";
import CricketSquads from "@/components/Sports/CricketSquads";
import Innings from "@/components/Sports/Innings";
import Lineups from "@/components/Sports/Lineups";
import MatchInfo from "@/components/Sports/MatchInfo";
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
    console.log(endpoint);
    await axios
      .get(endpoint)
      .then((response) => {
        console.log(response);
        if (response?.status == 200) {
          setDetails(response?.data?.scores?.categories[0].matches[0]);
          setLoading(false);
        }
      })
      .catch((errors) => {
        notify("error", "Something went wrong.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGameDetails();
  }, [cat, league, match]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="game-details-center">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner />
              </div>
            ) : (
              <div className="cricket-tabs-area">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <Row>
                    <Col sm={3}>
                      <Nav variant="pills" className="flex-column">
                        {details?.odds?.map((item, index) => (
                          <Nav.Item key={index} className="mb-3">
                            <Nav.Link eventKey={`link-${index}`}>
                              {item?.value}
                            </Nav.Link>
                          </Nav.Item>
                        ))}
                      </Nav>
                    </Col>
                    <Col sm={9}>
                      <Tab.Content>
                        {details?.odds?.map((item, index) => (
                          <Tab.Pane eventKey={`link-${index}`} key={index}>
                            {item?.bookmakers?.map((odd, i) => 
                            <div className="card mb-2" key={i}>
                            <div className="card-body">
                              <h4 className="text-center">{odd.name}</h4>
                              {odd?.odds?.map((o, j) => (
                                <div key={j} className="d-flex justify-content-between">
                                  <span>{o.name}</span>
                                  <span>{o.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                            )}
                          </Tab.Pane>
                        ))}
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
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
