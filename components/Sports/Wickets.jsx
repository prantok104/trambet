import React from 'react'

const Wickets = ({title, data=[]}) => {
  return (
    <div className="cricket-batsman-innig">
      {data?.length > 0 ? (
        <>
          <h6 className="df-font text-capitalize mb-2">{title}</h6>
          <table className="table table-responsive table-dark table-striped">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>Innings</th>
                <th>Overs</th>
                <th>Player</th>
                <th>Post</th>
                <th>Runs</th>
                <th>Wickets</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data, index) => (
                <tr key={`wickets_info_${index}`}>
                  <td>{data.id}</td>
                  <td>{data.inning}</td>
                  <td>{data.overs}</td>
                  <td>{data.player}</td>
                  <td>{data.post}</td>
                  <td>{data.runs}</td>
                  <td>{data.wickets}</td>
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

export default Wickets