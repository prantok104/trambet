import React from 'react'

const SquadsPlayerForCricket = ({ team, item = {} }) => {
  return (
    <div className="cricket-batsman-innig">
      <h6 className="df-font text-capitalize mb-2">{team}</h6>
      <table className="table table-responsive table-dark table-striped">
        <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>ODI</th>
            <th>Role</th>
            <th>T20</th>
            <th>Test</th>
          </tr>
        </thead>
        <tbody>
          {item?.map((data, index) => (
            <tr key={`cricket_squads_${index}`}>
              <td>{++index}</td>
              <td>{data.id}</td>
              <td>{data.odi?'Yes' : 'No'}</td>
              <td>{data.role}</td>
              <td>{data.t20 ? 'Yes' : 'No'}</td>
              <td>{data.test ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SquadsPlayerForCricket;