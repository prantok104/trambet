import betSlipReducer from "@/store/reducers/betSlipReducer";
import AuthReducer from "@/store/reducers/AuthReducer";

const { configureStore } = require("@reduxjs/toolkit")


const reducer = {
  betSlipReducer: betSlipReducer,
  AuthReducer: AuthReducer,
};

const store = configureStore({
   reducer:reducer,
   devTools:true
});

export default store;