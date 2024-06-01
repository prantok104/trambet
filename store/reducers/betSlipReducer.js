const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
   bets: [],
   slip: false
}

const betSlipReducer = createSlice({
  name: "betSlipReducer",
  initialState,
  reducers: {
    addBetToSlip(state, action){
      state.bets.push(action.payload);
      state.slip = true;
    },
    removeBetFromSlip(state, action){
      state.bets = state.bets.filter((bet, index) => bet?.id !== action.payload);
      state.slip = true;
    },
    clearBetSlip(state, action){
      state.bets = action.payload;
      state.slip = true;
    },
    closeSlip(state, action){
      state.slip = false
    },
    openSlip(state, action){
      state.slip = false
    },
    toggleSlip(state, action){
      state.slip = action.payload
    }
  },
});

export default betSlipReducer.reducer;

export const { addBetToSlip, removeBetFromSlip, clearBetSlip,toggleSlip, bets } = betSlipReducer.actions;
