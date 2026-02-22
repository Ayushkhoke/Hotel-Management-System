import {
  User,
  Settings,
  Table,
  LogOut,
  BedDouble,
  MenuSquare,
  Utensils

} from "lucide-react";

export const ACCOUNT_TYPES = {
  ADMIN: "Admin",
  USER: "User",
};

export const SIDEBAR_LINKS = [
  {
    id: 1,
    name: "My Profile",
    icon: User,
    path: "/dashboard/my-profile",
  },
 
  {
    id: 2,
    name: "Table",
    icon: Table,
    path: "/dashboard/table",
    // type: ACCOUNT_TYPES.ADMIN,
  },
  {
    id: 3,
    name: "Room",
    icon: BedDouble,
    path: "/dashboard/room",
    // type: ACCOUNT_TYPES.ADMIN,
  },
  {
    id: 4,
    name: "Menu",
    icon: MenuSquare,
    path: "/dashboard/menu",
    // type: ACCOUNT_TYPES.ADMIN,
  },
{
  id: 5,
  name: "Orders",
  icon: Utensils,
  path: "/dashboard/orders",
},

  //  {
  //   id:7 ,
  //   name: "Order",
  //    icon: Utensils,
  //    path: "/dashboard/order",
  //    type: ACCOUNT_TYPES.ADMIN,
  // },
  {
    id: 6,
    name: "Logout",
    icon: LogOut,
  },
   {
    id: 7,
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
   
];
