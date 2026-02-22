const BASE_URL="http://localhost:4000/api/v1"



export const auth={
    SIGNUP_API:BASE_URL+"/auth/signup",
    LOGIN_API:BASE_URL+"/auth/login",
    CHANGE_PASSWORD_API:BASE_URL+"/auth/change-password",
}

export const table={
    CREATE_TABLE_API:BASE_URL+"/table/createTable",
    GET_TABLES_API:BASE_URL+"/table/getTables",
    UPDATE_TABLE_API:BASE_URL+"/table/updateTableStatus",
    // DELETE_TABLE_API:BASE_URL+"/tables/delete/",
}


export const room={
CREATE_ROOM_API:BASE_URL+"/room/createroom",
    UPDATE_ROOM_API:BASE_URL+"/room/updateroom",
    DELETE_ROOM_API:BASE_URL+"/room/deleteroom",
GET_ROOM_API:BASE_URL+"/room/getRooms",
  BOOK_ROOM_API: "/booking/bookroom",
   GET_ROOMBOOKING_API: "/booking/my-bookings",
    DELETE_ROOMBOOKING_API: "/booking/deletebooking",
}

export const menu={
    CREATE_MENU_API:BASE_URL+"/booking/createmenu",
    GET_MENU_API:BASE_URL+"/booking/getmenus",
    DELETE_MENU_API:BASE_URL+"/booking/deletemenu"
}

export const tableBooking = {
   BOOK_TABLE_API: BASE_URL + "/table/bookTable",
   GET_TABLEBOOKING_API:BASE_URL+"/table/getmybooking",
  CANCEL_TABLE_BOOKING_API: BASE_URL + "/table/cancelbooking",
};
export const order= {
CREATE_ORDER_API: BASE_URL + "/booking/place",
  GET_MY_ORDERS_API: BASE_URL + "/booking/my-orders",
  CANCEL_ORDER_API:BASE_URL + "/booking/cancel"
};

export const payment={
 CAPTURE_PAYMENT_API:BASE_URL +"/payment/capturePayment",
  VERIFY_PAYMENT_API:BASE_URL +"/payment/verifyPayment",
  VERIFY_PAYMENT_BOOKING_API:BASE_URL +"/verifyPaymentBooking"
}

export const booking={
     ROOM_BOOK_API:BASE_URL +"/booking/bookroom",
     GET_MY_BOOKINGS_API:BASE_URL +"/booking/my-bookings",
}