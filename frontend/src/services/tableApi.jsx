// import toast from 'react-hot-toast';
// import { table } from './apis';
// import { apiConnector } from './apiconnector';
// import { setTables } from '../slices/tableSlice';
// import { setLoading } from '../slices/authSlice';


// export function createTable(formData,navigate,token){
//     return async(dispatch)=>{
//         dispatch(setLoading(true));

//         try{
//          headers: {
//   Authorization: `Bearer ${token}`,
// };

//             const res=await apiConnector("POST",table.CREATE_TABLE_API,formData,headers);
//             if(!res.data.success){
//                 throw new Error(res.data.message);
//             }
//             toast.success("Table created successfully");
//             navigate("/dashboard/tables");
//         }  
//         catch(error){
//             toast.error(
//                 error.response?.data?.message || "Failed to create table"
//             );
//         }
//         dispatch(setLoading(false));    

//     }

import toast from "react-hot-toast";
import { table } from "./apis";
import {apiConnector} from './apiconnector'
import { setTables,setTable,setEditTable } from "../slices/tableSlice";
import { setLoading } from "../slices/authSlice";

export function createTable(data, navigate, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
     const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await apiConnector(
        "POST",
        table.CREATE_TABLE_API,
        data,
        headers
    
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Table created successfully");
      navigate("/dashboard/table");
      console.log(token);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create table"
      );
    }

    dispatch(setLoading(false));
  };
}



export function updateTableStatus(tableId, formData, token) {
  return async (dispatch) => {
    try {
      // 🔥 THIS WAS MISSING
      formData.append("table_id", tableId);

      const res = await apiConnector(
        "PUT",
        table.UPDATE_TABLE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      dispatch(getalltable(token));
      dispatch(setTable(res.data.table));
      dispatch(setEditTable(false));

    } catch (error) {
      console.error(error.response?.data || error);
    }
  };
}



export  function getalltable(token) {
  return async(dispatch)=>{
  let result = [];

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await apiConnector(
      "GET",
      table.GET_TABLES_API,
      null,          // ✅ no body for GET
      headers
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    result = res.data.tables;
    dispatch(setTables(result)) // ✅ match backend key
  } catch (error) {
    console.log("Error fetching table", error);
    toast.error("Could not get tables");

  }

 
  }

}






