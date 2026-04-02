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
import { setTables,setTable,setEditTable,removeTable } from "../slices/tableSlice";
import { setLoading } from "../slices/authSlice";

export function createTable(data, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      if (!token) {
        throw new Error("Session expired. Please login again.");
      }

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
      dispatch(getalltable(token));
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to create table"
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

export function deleteTable(tableId, token, force = false) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const url = force 
        ? `${table.DELETE_TABLE_API}/${tableId}?force=true`
        : `${table.DELETE_TABLE_API}/${tableId}`;
        
      const res = await apiConnector(
        "DELETE",
        url,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      // Optimistically remove table from UI immediately
      dispatch(removeTable(tableId));
      toast.success("Table deleted successfully");
      
      // Refresh the table list to ensure consistency
      await dispatch(getalltable(token));
      dispatch(setLoading(false));
      return { success: true };

    } catch (error) {
      console.error(error.response?.data || error);
      const errorData = error.response?.data;
      
      dispatch(setLoading(false));
      
      // If requires force, return the error data instead of showing toast
      if (errorData?.requiresForce) {
        return {
          success: false,
          requiresForce: true,
          activeBookingsCount: errorData.activeBookingsCount,
          message: errorData.message,
        };
      }
      
      toast.error(
        error.response?.data?.message || "Failed to delete table"
      );
      return { success: false };
    }
  };
}



export  function getalltable(token) {
  return async(dispatch)=>{
  let result = [];

  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

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

// GET AVAILABLE TABLES FOR SPECIFIC DATE AND TIME SLOT
export async function getAvailableTables(date, timeSlot, token) {
  try {
    const url = `${table.GET_AVAILABLE_TABLES_API}?date=${date}&timeSlot=${timeSlot}`;
    console.log("Fetching available tables:", { date, timeSlot, url });
    
    const res = await apiConnector(
      "GET",
      url,
      null,
      { Authorization: `Bearer ${token}` }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    console.log("Available tables received:", res.data.tables);
    console.log("First table sample:", res.data.tables[0]);
    
    return res.data.tables || [];
  } catch (error) {
    console.log("GET AVAILABLE TABLES ERROR", error);
    toast.error(error.response?.data?.message || "Could not fetch available tables");
    return [];
  }
}






