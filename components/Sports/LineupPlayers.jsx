import React from 'react'

const LineupPlayers = ({title="", data=[]}) => {
  return (
    <div className="cricket-batsman-innig">
      {data?.length > 0 ? (
        <>
          <h6 className="df-font text-capitalize mb-2">{title}</h6>
          <table className="table table-responsive table-dark table-striped">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Wickets</th>
                <th>Wides</th>
                <th>Catches</th>
                <th>Run Outs</th>
                <th>Stumpings</th>
                <th>Is Impact</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data, index) => (
                <tr key={`lineup_players_${index}`}>
                  <td>{data?.name}</td>
                  <td>{data?.wickets}</td>
                  <td>{data?.wides}</td>
                  <td>{data?.c}</td>
                  <td>{data?.ro}</td>
                  <td>{data?.st}</td>
                  <td>{data?.is_impact == "True" ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default LineupPlayers