import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu:[],
    menuItem:null,
    editMenu: false,
};

const menuSlice=createSlice({
    name:"menu",
    initialState,
    reducers:{
        setMenu(state,action){
            state.menu=action.payload;
        },
        setMenuItem(state,action){
            state.menuItem=action.payload;
        },
        setEditMenu(state,action){
            state.editMenu=action.payload;
        },  
    },
}
)   

export const{setMenu,setMenuItem,setEditMenu}=menuSlice.actions;

export default menuSlice.reducer;