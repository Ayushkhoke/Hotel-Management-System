import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order:[],
    orderItem:null,
    cancelorder:false,
     paymentloading: false,
};

const orderSlice=createSlice({
    name:"order",
    initialState,
    reducers:{
        setOrder(state,action){
            state.order=action.payload;
        },
        setOrderItem(state,action){
            state.orderItem=action.payload;
        },
        setCancelOrder(state,action){
            state.cancelorder=action.payload;
        },  
        setPaymentLoading(state, action) {
      state.paymentloading = action.payload;
    },
    },
}
)   

export const{setOrder,setOrderItem,setCancelOrder,setPaymentLoading}=orderSlice.actions;

export default orderSlice.reducer;