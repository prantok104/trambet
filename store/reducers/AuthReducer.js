const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  user: {},
};

const AuthReducer = createSlice({
   name: 'AuthReducer',
   initialState,
   reducers: {
      AuthUserUpdate(state, action){
         state.user = action.payload
      }
   }
});

export default AuthReducer.reducer;

export const {AuthUserUpdate} = AuthReducer.actions