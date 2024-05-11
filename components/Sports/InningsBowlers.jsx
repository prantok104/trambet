import Link from 'next/link';
import React from 'react'

const InningsBowlers = ({data = []}) => {
  return (
    <div className="cricket-bowlers-innig">
      <h6 className="df-font text-capitalize mb-2">Bowlers statistics</h6>
      <table className="table table-responsive table-dark table-striped">
        <thead>
          <tr>
            <th>Bowler</th>
            <th>Overs</th>
            <th>Maidens</th>
            <th>Runs</th>
            <th>Wickets</th>
            <th>Dots</th>
            <th>No Balls</th>
            <th>Wides</th>
            <th>Economy Rate</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((data, index) => (
            <tr key={`innings_bowlers_${index}`}>
              <td>
                <Link href={`/sports/game/player/${data?.profileid}`}>
                  {data?.bowler}
                </Link>
              </td>
              <td>{data.o}</td>
              <td>{data.m}</td>
              <td>{data.r}</td>
              <td>{data.w}</td>
              <td>{data.dots}</td>
              <td>{data.nb}</td>
              <td>{data.wd}</td>
              <td>{data.er}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InningsBowlers