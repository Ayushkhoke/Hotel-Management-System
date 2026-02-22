import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tables:[],
  table:null,
  edittable: false,
 
  //bookin table
  tablebookings:[],
  tablebooked:null,
  edittablebooking:null,
PaymentLoading: null


};

const tableSlice=createSlice({
    name:"table",
    initialState,
    reducers:{
setTables(state,action){
    state.tables=action.payload;
},
setTable(state,action){
    state.table=action.payload;
    },
    setEditTable(state,action){
        state.edittable=action.payload;
},  
setTablebookings(state,action){
    state.tablebookings=action.payload;
},
setTablebooked(state,action){
    state.tablebooked=action.payload;
},
setedittablebooking(state,action){
    state.edittablebooking=action.payload;
},
setPaymentLoading(state,action){
     state.PaymentLoading=action.payload;
}

},
}
)


export const {setTables,setTable,setEditTable,setTablebookings,setTablebooked,setedittablebooking,setPaymentLoading}=tableSlice.actions;

export default tableSlice.reducer;