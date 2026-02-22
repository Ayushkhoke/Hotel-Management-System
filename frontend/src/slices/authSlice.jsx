import { createSlice } from "@reduxjs/toolkit";
const savedUser = localStorage.getItem("user");
const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") || null,
  loggedIn: !!localStorage.getItem("token"),
  user: savedUser ? JSON.parse(savedUser) : null,
   
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setToken(state, action) {
      state.token = action.payload;
      state.loggedIn = !!action.payload;
    },

    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },

   setUser(state, action) {
      state.user = action.payload;
    },

    logout(state) {
      state.token = null;
      state.user = null;
      state.loggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const {
  setSignupData,
  setLoading,
  setToken,
  setLoggedIn,
  setUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
