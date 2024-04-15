import React from 'react'
import { useBetSlip } from '../Context/BetslipProvider'
const OddsButton = ({odds}) => {
  const {addBetToSlip} = useBetSlip();

  const handleAddToBetSlip = () => {
      addBetToSlip(odds);
      console.log(odds);
  }

  return (
    <button onClick={handleAddToBetSlip}>{odds?.value}</button>
  )
}

export default OddsButton