import BetSlip from '@/components/Bets/BetSlip'
import React from 'react'

const GameDetails = () => {
  return (
    <div className='container-fluid'>
      <div className="row">
         <div className="col-md-3">
            <div className="game-details-left-sidebar">
               Category area
            </div>
         </div>
         <div className="col-md-5">
            <div className="game-details-center">
                  Banner area
                  Odds area
            </div>
         </div>
         <div className="col-md-4">
            <div className="game-details-right-sidebar bg-shadow df-radius p-2">
               <BetSlip />
            </div>
         </div>
      </div>
    </div>
  )
}

export default GameDetails