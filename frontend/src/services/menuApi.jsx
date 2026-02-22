import { toast } from "react-hot-toast";
import { apiConnector } from "./apiconnector";
import { menu } from "./apis";
 // make sure this exists
 
 import { setLoading } from "../slices/authSlice";
import { setMenu } from "../slices/menuSlice";

export function createMenu(data, token) {
 
  return async (dispatch) => {
   dispatch(setLoading(true));
    try {
      const res = await apiConnector(
        "POST",
        menu.CREATE_MENU_API,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!res?.data?.success) {
        throw new Error(res?.data?.message || "Unable to create menu");
      }

      toast.success("Menu created successfully");

      return res.data.menu; // ✅ correct

    } catch (err) {
      console.error("CREATE MENU ERROR:", err);
      toast.error(err?.message || "Menu creation failed");
      return null;
    }
     finally {
      dispatch(setLoading(false)); // ✅ ALWAYS runs
    }
  };
}


export function getAllMenus(token) {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        "GET",
        menu.GET_MENU_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!res?.data?.success) {
        throw new Error(res?.data?.message || "Failed to fetch menu");
      }

      dispatch(setMenu(res.data.menus));
      toast.success("Menu fetched successfully");

    } catch (error) {
      console.error("GET MENU ERROR:", error);
      toast.error(error?.message || "Failed to fetch menu");
    }
  };
}



export function deleteMenu(menuId, token) {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        "DELETE",
        menu.DELETE_MENU_API,
         { menuId },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!res?.data?.success) {
        throw new Error(res?.data?.message || "Failed to delete menu");
      }

      toast.success("Menu deleted successfully");

      // refresh menu list
      dispatch(getAllMenus(token));

    } catch (error) {
      console.error("DELETE MENU ERROR:", error);
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete menu"
      );
    }
  };
}
