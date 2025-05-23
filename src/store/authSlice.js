import {createSlice} from "@reduxjs/toolkit"

const initialState ={
  status:false,
  userData: null,
}

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    login:(state,action)=>{
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout:(state)=>{
      state.status=false;
      state.userData=null;
    }
  }

});

export const {login, logout} = authSlice.actions; //here actions are the login and logout in reducers

export const authReducer = authSlice.reducer;