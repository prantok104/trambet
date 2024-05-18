import Image from 'next/image';
import React from 'react'
import { Spinner } from 'react-bootstrap';

const CricketPlayerDetails = ({loading = true, data={}}) => {
  return (
    <div className="crickter-profile-area">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : (
        <>
          {" "}
          <div className="cricket-player-profile d-flex gap-2">
            <div className="image-area">
              {data?.image ? (
                <Image
                  src={`data:image/png;base64,${data?.image}`}
                  alt="image"
                  width={"135"}
                  height={"160"}
                />
              ) : (
                ""
              )}
            </div>
            <div className="player-profile-content d-flex flex-column gap-2">
              <h5 className="df-font mt-2">
                <b>Name:</b> {data?.name}
              </h5>
              <p>
                <b>Age:</b> {data?.age ? data?.age : "Not Share"}
              </p>
              <p>
                <b>Batting Style:</b>{" "}
                {data?.batting_style ? data?.batting_style : "Not Share"}
              </p>
              <p>
                <b>Bowling Style:</b>{" "}
                {data?.bowling_style ? data?.bowling_style : "Not Share"}
              </p>
              <p>
                <b>Country:</b> {data?.country ? data?.country : "Not Share"}
              </p>
              <p>
                <b>Playing role:</b>{" "}
                {data?.playing_role ? data?.playing_role : "Not Share"}
              </p>
              <p>
                <b>Born:</b> {data?.born ? data?.born : "Not Share"}
              </p>
            </div>
          </div>
          <div className="table-responsive">
            <h5 className="mt-4 mb-2 df-font">
              Statistics of batting and fielding:
            </h5>
            <table className="table table-dark table-striped">
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Match name</th>
                  <th>Balls faces</th>
                  <th>Batting average</th>
                  <th>Boundary fours</th>
                  <th>Boundary sixiers</th>
                  <th>Catches taken</th>
                  <th>Fifties scored</th>
                  <th>Highest inning score</th>
                  <th>Hundreds scored</th>
                  <th>Innings</th>
                  <th>Matches</th>
                  <th>Not outs</th>
                  <th>Runs</th>
                  <th>Strike rate</th>
                  <th>Stamping made</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data?.stats?.batting_fielding?.type) ? (
                  data?.stats?.batting_fielding?.type?.map((data, index) => (
                    <tr key={`innings_batmans_${index}`}>
                      <td>{++index}</td>
                      <td>{data.name}</td>
                      <td>{data.balls_faces}</td>
                      <td>{data.batting_average}</td>
                      <td>{data.boundary_fours}</td>
                      <td>{data.boundary_sixiers}</td>
                      <td>{data.catches_taken}</td>
                      <td>{data.fifties_scored}</td>
                      <td>{data.highest_inning_score}</td>
                      <td>{data.hundreds_scored}</td>
                      <td>{data.innings}</td>
                      <td>{data.matches}</td>
                      <td>{data.not_outs}</td>
                      <td>{data.runs}</td>
                      <td>{data.sr}</td>
                      <td>{data.stumpings_made}</td>
                    </tr>
                  ))
                ) : data?.stats?.batting_fielding?.type?.hasOwnProperty(
                    "name"
                  ) ? (
                  <tr key={`innings_batmans_1`}>
                    <td>1</td>
                    <td>{data?.stats?.batting_fielding?.type.name}</td>
                    <td>{data?.stats?.batting_fielding?.type.balls_faces}</td>
                    <td>
                      {data?.stats?.batting_fielding?.type.batting_average}
                    </td>
                    <td>
                      {data?.stats?.batting_fielding?.type.boundary_fours}
                    </td>
                    <td>
                      {data?.stats?.batting_fielding?.type.boundary_sixiers}
                    </td>
                    <td>{data?.stats?.batting_fielding?.type.catches_taken}</td>
                    <td>
                      {data?.stats?.batting_fielding?.type.fifties_scored}
                    </td>
                    <td>
                      {data?.stats?.batting_fielding?.type.highest_inning_score}
                    </td>
                    <td>
                      {data?.stats?.batting_fielding?.type.hundreds_scored}
                    </td>
                    <td>{data?.stats?.batting_fielding?.type.innings}</td>
                    <td>{data?.stats?.batting_fielding?.type.matches}</td>
                    <td>{data?.stats?.batting_fielding?.type.not_outs}</td>
                    <td>{data?.stats?.batting_fielding?.type.runs}</td>
                    <td>{data?.stats?.batting_fielding?.type.sr}</td>
                    <td>
                      {data?.stats?.batting_fielding?.type.stumpings_made}
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </table>

            <h5 className="mt-4 mb-2 df-font">Statistics of bowling:</h5>
            <table className="table table-dark table-striped">
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Match name</th>
                  <th>Average</th>
                  <th>Balls</th>
                  <th>Best inning bowling</th>
                  <th>Best match bowling</th>
                  <th>Economy rate</th>
                  <th>Five wickets in inn</th>
                  <th>Four wickets in inn</th>
                  <th>Ten wickets in inn</th>
                  <th>Innings</th>
                  <th>Matches</th>
                  <th>Runs</th>
                  <th>Strike rate</th>
                  <th>Wickets</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data?.stats?.bowling?.type) ? (
                  data?.stats?.bowling?.type?.map((data, index) => (
                    <tr key={`innings_batmans_${index}`}>
                      <td>{++index}</td>
                      <td>{data?.name}</td>
                      <td>{data?.average}</td>
                      <td>{data?.balls}</td>
                      <td>{data?.best_inning_bowling}</td>
                      <td>{data?.best_match_bowling}</td>
                      <td>{data?.economy_rate}</td>
                      <td>{data?.five_wickets_in_inn}</td>
                      <td>{data?.four_wickets_in_inn}</td>
                      <td>{data?.ten_wickets_in_match}</td>
                      <td>{data?.innings}</td>
                      <td>{data?.matches}</td>
                      <td>{data?.runs}</td>
                      <td>{data?.sr}</td>
                      <td>{data?.wickets}</td>
                    </tr>
                  ))
                ) : data?.stats?.bowling?.type?.hasOwnProperty("name") ? (
                  <tr key={`innings_batmans_1`}>
                    <td>1</td>
                    <td>{data?.stats?.bowling?.type?.name}</td>
                    <td>{data?.stats?.bowling?.type?.average}</td>
                    <td>{data?.stats?.bowling?.type?.balls}</td>
                    <td>{data?.stats?.bowling?.type?.best_inning_bowling}</td>
                    <td>{data?.stats?.bowling?.type?.best_match_bowling}</td>
                    <td>{data?.stats?.bowling?.type?.economy_rate}</td>
                    <td>{data?.stats?.bowling?.type?.five_wickets_in_inn}</td>
                    <td>{data?.stats?.bowling?.type?.four_wickets_in_inn}</td>
                    <td>{data?.stats?.bowling?.type?.ten_wickets_in_match}</td>
                    <td>{data?.stats?.bowling?.type?.innings}</td>
                    <td>{data?.stats?.bowling?.type?.matches}</td>
                    <td>{data?.stats?.bowling?.type?.runs}</td>
                    <td>{data?.stats?.bowling?.type?.sr}</td>
                    <td>{data?.stats?.bowling?.type?.wickets}</td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>{" "}
        </>
      )}
    </div>
  );
}

export default CricketPlayerDetails