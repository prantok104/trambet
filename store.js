import betSlipReducer from "@/store/reducers/betSlipReducer";

const { configureStore } = require("@reduxjs/toolkit")


const reducer = {
  betSlipReducer: betSlipReducer,
};

const store = configureStore({
   reducer:reducer,
   devTools:true
});

export default store;