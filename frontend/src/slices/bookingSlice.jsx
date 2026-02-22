import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    booking:[],
    bookedroom:null,
    editbookingroom: false,
    PaymentLoading:false,
};

const bookingSlice=createSlice({
    name:"booking",
    initialState,
    reducers:{
        setbooking(state,action){
            state.booking=action.payload;
        },
        setbookedroom(state,action){
            state.bookedroom=action.payload;
        },
        seteditbookingroom(state,action){
            state.editbookingroom=action.payload;
        },  
         setPaymentLoading(state,action){
            state.PaymentLoading=action.payload;
        },  
    },
}
)   

export const{setbooking,setbookedroom,seteditbookingroom,setPaymentLoading}=bookingSlice.actions;

export default bookingSlice.reducer;