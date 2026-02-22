import{combineReducers}from'redux';
import authReducer from '../slices/authSlice.jsx';
import tableReducer from '../slices/tableSlice.jsx';
import menuReducer from '../slices/menuSlice.jsx';
import roomReducer from '../slices/roomSlice.jsx';
import orderReducer from '../slices/orderSlice.jsx'
import bookingReducer from '../slices/bookingSlice.jsx'
const rootReducer=combineReducers({
    auth:authReducer,
    table:tableReducer,
    menu:menuReducer,
    room:roomReducer,
    order:orderReducer,
    booking:bookingReducer
}); 

export default rootReducer;