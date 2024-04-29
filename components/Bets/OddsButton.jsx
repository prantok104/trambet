import React, { useEffect, useState } from 'react'
import { useBetSlip } from '../Context/BetslipProvider'
const OddsButton = ({odds}) => {
  const { addBetToSlip, removeBetFromSlip, selectedBets } = useBetSlip();
  const [isClicked, setIsClicked] = useState(false);

  const handleAddToBetSlip = (event) => {
      event.preventDefault();
      setIsClicked((prevState) => !prevState)
  }

  useEffect(() => {
    if (isClicked) {
      addBetToSlip(odds);
    } else {
      removeBetFromSlip(0);
    }
  }, [isClicked])

  return (
    <button className={`bet-odds-button ${isClicked ? 'active-odds-button' : ''}`} onClick={handleAddToBetSlip}>{odds?.value}</button>
  )
}

export default OddsButton