const { createContext, useState, useContext } = require("react");

const BetslipContext = createContext();

export const BetslipProvider = ({children}) => {

   // Initial selected bets
   const [selectedBets, setSelectedBets] = useState([]);

   // Add new bet
   const addBetToSlip = (bet) => {
      setSelectedBets([...selectedBets, bet]);
   }

   // Remove the indexed bet
   const removeBetFromSlip = (index) => {
      const updatedBets = [...selectedBets];
      updatedBets.splice(index, 1);
      setSelectedBets(updatedBets);
   }
   console.log(selectedBets);
   return (
      <BetslipContext.Provider value={{ selectedBets, addBetToSlip, removeBetFromSlip }}>
         {children}
      </BetslipContext.Provider>
   );
}

export const useBetSlip = () => useContext(BetslipContext);