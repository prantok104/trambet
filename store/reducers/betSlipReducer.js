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
      state.bets = state.bets.filter((bet, index) => index !== action.payload);
      state.slip = true;
    },
    clearBetSlip(state, action){
      state.bets = action.payload;
      state.slip = true;
    }
  },
});

export default betSlipReducer.reducer;

export const { addBetToSlip, removeBetFromSlip, clearBetSlip, bets } = betSlipReducer.actions;
