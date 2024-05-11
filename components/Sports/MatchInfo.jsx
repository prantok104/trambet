import React from 'react'

const MatchInfo = ({title, data=[]}) => {
  return (
    <div className="cricket-batsman-innig">
      {data?.length > 0 ? (
        <>
          <h6 className="df-font text-capitalize mb-2">{title}</h6>
          <table className="table table-responsive table-dark table-striped">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data, index) => (
                <tr key={`match_info_${index}`}>
                  <td>{data?.name}</td>
                  <td>{data?.value}</td>
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

export default MatchInfo