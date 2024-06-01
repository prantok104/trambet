import React from 'react'
import LineupPlayers from './LineupPlayers';

const Lineups = ({data=[]}) => {
  return (
    <>
      <LineupPlayers
        title="Players of local team"
        data={data?.localteam?.player}
      />
      <LineupPlayers
        title="Players of visitor team"
        data={data?.visitorteam?.player}
      />
    </>
  );
}

export default Lineups