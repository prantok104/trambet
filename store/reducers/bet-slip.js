const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
   bets: [],
}

const betSlipReducer = createSlice({
  name: "betSlipReducer",
  initialState,
  reducers: {
    addBetToSlip: (state, action) => {
      state.bets.push(action.payload);
    },
    removeBetFromSlip: (state, action) => {
      state.bets = state.bets.filter((bet, index) => index !== action.payload);
    },
  },
});

export default betSlipReducer.reducer;

export const { addBetToSlip, removeBetFromSlip } = betSlipReducer.actions;
