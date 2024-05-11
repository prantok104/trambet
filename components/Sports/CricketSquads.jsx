import React from 'react'
import SquadsPlayerForCricket from './SquadsPlayerForCricket'

const CricketSquads = ({data = []}) => {
  return (
    <>
      {data?.map((item) => (
         <SquadsPlayerForCricket team={item?.name} item={item?.player} />
      ))}
    </>
  )
}

export default CricketSquads