// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createMenu, getAllMenus,deleteMenu } from "../../services/menuApi";
// import { setMenuItem, setEditMenu } from "../../slices/menuSlice";
// import Upload from "./Upload";
// // updateMenu
// export default function MenuContainer() {
//   const { token } = useSelector((state) => state.auth);
//   const { menu, menuItem, editMenu } = useSelector((state) => state.menu);
//   const dispatch = useDispatch();

//   const [formdata, setFormdata] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image: null,
//   });

//   // ✅ SUBMIT
//   function submitHandler(e) {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", formdata.name);
//     data.append("price", formdata.price);
//     data.append("description", formdata.description);
//     if (formdata.image) data.append("image", formdata.image);

//     if (editMenu && menuItem?._id) {
//       dispatch(updateMenu(menuItem._id, data, token));
//     } else {
//       dispatch(createMenu(data, token));
//     }
//   }

//   // ✅ EDIT
//   // function editHandler(item) {
//   //   dispatch(setMenuItem(item));
//   //   dispatch(setEditMenu(true));

//   //   setFormdata({
//   //     name: item.name,
//   //     price: item.price,
//   //     description: item.description,
//   //     image: null,
//   //   });
//   // }
//   function deleteHandler(menuId) {
// dispatch(deleteMenu(menuId, token));
// }


//   // ✅ FETCH MENUS
//   useEffect(() => {
//     if (token) {
//       dispatch(getAllMenus(token));
//     }
//   }, [dispatch, token]);

//   return (
//     <div className="grid grid-cols-2 gap-6 p-6">
//       {/* MENU LIST */}
//       <div>
//         {menu?.map((m) => (
//           <div key={m._id} className="border p-4 mb-3">
//             <p>{m.name}</p>
//             <p>₹{m.price}</p>
//             <img src={m.image} className="w-20" alt={m.name} />
//             <button
//   onClick={() => deleteHandler(m._id)}
//   className="bg-red-500 text-white px-3 py-1 mt-2"
// >
//   Delete
// </button>
//           </div>
//         ))}
//       </div>

//       {/* FORM */}
//       <form onSubmit={submitHandler} className="border p-4">
//         <input
//           placeholder="Name"
//           value={formdata.name}
//           onChange={(e) =>
//             setFormdata({ ...formdata, name: e.target.value })
//           }
//         />
//         <input
//           placeholder="Price"
//           value={formdata.price}
//           onChange={(e) =>
//             setFormdata({ ...formdata, price: e.target.value })
//           }
//         />
//         <textarea
//           placeholder="Description"
//           value={formdata.description}
//           onChange={(e) =>
//             setFormdata({ ...formdata, description: e.target.value })
//           }
//         />

//         <Upload
//           onChange={(file) =>
//             setFormdata({ ...formdata, image: file })
//           }
//         />

//         <button type="submit">
//           {editMenu ? "Update Menu" : "Create Menu"}
//         </button>
//       </form>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createMenu, getAllMenus, deleteMenu } from "../../services/menuApi";
// import Upload from "./Upload";

// export default function MenuContainer() {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { menu } = useSelector((state) => state.menu);

//   const [formdata, setFormdata] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image: null,
//   });

//   // 🔹 CREATE MENU
//   function submitHandler(e) {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", formdata.name);
//     data.append("price", formdata.price);
//     data.append("description", formdata.description);
//     if (formdata.image) data.append("image", formdata.image);

//     dispatch(createMenu(data, token));

//     // reset form
//     setFormdata({
//       name: "",
//       price: "",
//       description: "",
//       image: null,
//     });
//   }

//   // 🔹 DELETE MENU
//   function deleteHandler(menuId) {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;
//     dispatch(deleteMenu(menuId, token));
//   }

//   // 🔹 FETCH MENUS
//   useEffect(() => {
//     if (token) {
//       dispatch(getAllMenus(token));
//     }
//   }, [dispatch, token]);

//   return (
//     <div className="min-h-screen bg-[#faf7f2] p-8">
//       <h1 className="text-4xl font-serif font-bold text-center mb-10">
//         🍽️ Hotel Menu
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* MENU LIST */}
//         <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {menu?.length === 0 && (
//             <p className="text-center col-span-2 text-gray-500">
//               No menu items available
//             </p>
//           )}

//           {menu?.map((m) => (
//             <div
//               key={m._id}
//               className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
//             >
//               <img
//                 src={m.image}
//                 alt={m.name}
//                 className="h-44 w-full object-cover"
//               />

//               <div className="p-4">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-lg font-semibold">{m.name}</h2>
//                   <span className="text-green-600 font-bold text-lg">
//                     ₹{m.price}
//                   </span>
//                 </div>

//                 <p className="text-sm text-gray-600 mt-2">
//                   {m.description}
//                 </p>

//                 <button
//                   onClick={() => deleteHandler(m._id)}
//                   className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-full"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ADD MENU FORM */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4 text-center">
//             Add New Dish
//           </h2>

//           <form onSubmit={submitHandler} className="space-y-4">
//             <input
//               placeholder="Dish Name"
//               className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
//               value={formdata.name}
//               onChange={(e) =>
//                 setFormdata({ ...formdata, name: e.target.value })
//               }
//               required
//             />

//             <input
//               placeholder="Price"
//               type="number"
//               className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
//               value={formdata.price}
//               onChange={(e) =>
//                 setFormdata({ ...formdata, price: e.target.value })
//               }
//               required
//             />

//             <textarea
//               placeholder="Description"
//               rows="3"
//               className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
//               value={formdata.description}
//               onChange={(e) =>
//                 setFormdata({ ...formdata, description: e.target.value })
//               }
//               required
//             />

//             <Upload
//               onChange={(file) =>
//                 setFormdata({ ...formdata, image: file })
//               }
//             />

//             <button
//               type="submit"
//               className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
//             >
//               Add to Menu
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createMenu, getAllMenus, deleteMenu } from "../../services/menuApi";
// import { setMenuItem } from "../../slices/menuSlice";
// import { useNavigate } from "react-router-dom";
// import Upload from "./Upload";

// export default function MenuContainer() {
//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);
//   const { menu } = useSelector((state) => state.menu);
// const navigate=useNavigate();
//   const [formdata, setFormdata] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image: null,
//   });

//   // ---------------- CREATE MENU (ADMIN) ----------------
//   function submitHandler(e) {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", formdata.name);
//     data.append("price", formdata.price);
//     data.append("description", formdata.description);
//     if (formdata.image) data.append("image", formdata.image);

//     dispatch(createMenu(data, token));

//     setFormdata({
//       name: "",
//       price: "",
//       description: "",
//       image: null,
//     });
//   }

//   // ---------------- DELETE MENU (ADMIN) ----------------
//   function deleteHandler(menuId) {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;
//     dispatch(deleteMenu(menuId, token));
//   }

//   // ---------------- FETCH MENU ----------------
//   useEffect(() => {
//     if (token) {
//       dispatch(getAllMenus(token));
//     }
//   }, [dispatch, token]);

// function orderhandler(menuItem){
//   dispatch(setMenuItem(menuItem));
//   navigate("/dashboard/order");
// }

//   // ---------------- UI ----------------
//   return (
//     <div className="min-h-screen bg-[#faf7f2] p-8">
//       <h1 className="text-4xl font-serif font-bold text-center mb-10">
//         🍽️ Hotel Menu
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* MENU LIST (ADMIN + USER) */}
//         <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {menu?.length === 0 && (
//             <p className="text-center col-span-2 text-gray-500">
//               No menu items available
//             </p>
//           )}

//           {menu?.map((m) => (
//             <div
//               key={m._id}
//               onClick={()=>{orderhandler(m)}}
//               className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden "
//             >
//               <img
//                 src={m.image}
//                 alt={m.name}
//                 className="h-44 w-full object-cover"
//               />

//               <div className="p-4">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-lg font-semibold">{m.name}</h2>
//                   <span className="text-green-600 font-bold text-lg">
//                     ₹{m.price}
//                   </span>
//                 </div>

//                 <p className="text-sm text-gray-600 mt-2">
//                   {m.description}
//                 </p>

//                 {/* 🔐 ADMIN ONLY */}
//                 {user?.accountType === "Admin" && (
//                   <button
//                     onClick={() => deleteHandler(m._id)}
//                     className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-full"
//                   >
//                     Delete
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* 🔐 ADMIN ONLY FORM */}
//         {user?.accountType === "Admin" && (
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-center">
//               Add New Dish
//             </h2>

//             <form onSubmit={submitHandler} className="space-y-4">
//               <input
//                 placeholder="Dish Name"
//                 className="w-full border rounded-lg px-4 py-2
//                 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 value={formdata.name}
//                 onChange={(e) =>
//                   setFormdata({ ...formdata, name: e.target.value })
//                 }
//                 required
//               />

//               <input
//                 placeholder="Price"
//                 type="number"
//                 className="w-full border rounded-lg px-4 py-2
//                 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 value={formdata.price}
//                 onChange={(e) =>
//                   setFormdata({ ...formdata, price: e.target.value })
//                 }
//                 required
//               />

//               <textarea
//                 placeholder="Description"
//                 rows="3"
//                 className="w-full border rounded-lg px-4 py-2
//                 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 value={formdata.description}
//                 onChange={(e) =>
//                   setFormdata({
//                     ...formdata,
//                     description: e.target.value,
//                   })
//                 }
//                 required
//               />

//               <Upload
//                 onChange={(file) =>
//                   setFormdata({ ...formdata, image: file })
//                 }
//               />

//               <button
//                 type="submit"
//                 className="w-full bg-orange-500 hover:bg-orange-600
//                 text-white py-2 rounded-lg font-semibold"
//               >
//                 Add to Menu
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createMenu, getAllMenus, deleteMenu } from "../../services/menuApi";
// import { setMenuItem } from "../../slices/menuSlice";
// import { useNavigate } from "react-router-dom";
// import Upload from "./Upload";

// export default function MenuContainer() {
//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);
//   const { menu, menuItem } = useSelector((state) => state.menu);
//   const navigate = useNavigate();

//   const [formdata, setFormdata] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image: null,
//   });

//   function submitHandler(e) {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", formdata.name);
//     data.append("price", formdata.price);
//     data.append("description", formdata.description);
//     if (formdata.image) data.append("image", formdata.image);

//     dispatch(createMenu(data, token));

//     setFormdata({
//       name: "",
//       price: "",
//       description: "",
//       image: null,
//     });
//   }

//   function deleteHandler(menuId) {
//     if (!window.confirm("Delete this dish?")) return;
//     dispatch(deleteMenu(menuId, token));
//   }

//   useEffect(() => {
//     if (token) {
//       dispatch(getAllMenus(token));
//     }
//   }, [dispatch, token]);

//   function orderhandler(item) {
//     dispatch(setMenuItem(item));
//     navigate("/dashboard/order");
//   }

//   return (
//     <div
//       className="min-h-screen bg-cover bg-fixed bg-center text-white px-4 sm:px-10 py-16"
//       style={{
//         backgroundImage:
//           "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')",
//       }}
//     >
//       {/* HEADER */}
//       <div className="text-center mb-16">
//         <h1 className="text-5xl font-bold text-yellow-400 tracking-wider">
//           Royal Gourmet Menu
//         </h1>
//         <p className="text-gray-300 mt-4 text-lg">
//           Premium Cuisine • Luxury Dining • Signature Experience
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

//         {/* MENU ITEMS */}
//         <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
//           {menu?.map((m) => (
//             <div
//               key={m._id}
//               onClick={() => orderhandler(m)}
//               className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/40 hover:-translate-y-3 transition duration-500 cursor-pointer"
//             >
//               <div className="overflow-hidden">
//                 <img
//                   src={m.image}
//                   alt={m.name}
//                   className="h-52 w-full object-cover group-hover:scale-110 transition duration-700"
//                 />
//               </div>

//               <div className="p-6 space-y-3">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-semibold text-yellow-400">
//                     {m.name}
//                   </h2>
//                   <span className="text-green-400 font-bold text-lg">
//                     ₹{m.price}
//                   </span>
//                 </div>

//                 <p className="text-gray-300 text-sm">
//                   {m.description}
//                 </p>

//                 {user?.accountType === "Admin" && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       deleteHandler(m._id);
//                     }}
//                     className="mt-3 px-4 py-2 bg-red-600 rounded-xl hover:bg-red-700 hover:scale-105 transition duration-300 text-sm"
//                   >
//                     Delete
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* STICKY CART SECTION */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 bg-white/10 backdrop-blur-xl border border-yellow-500/30 rounded-3xl p-6 shadow-2xl">
//             <h2 className="text-2xl font-semibold text-yellow-400 mb-6 text-center">
//               🛒 Your Cart
//             </h2>

//             {menuItem ? (
//               <div className="space-y-4">
//                 <img
//                   src={menuItem.image}
//                   alt={menuItem.name}
//                   className="w-full h-40 object-cover rounded-xl"
//                 />

//                 <h3 className="text-lg font-semibold text-white">
//                   {menuItem.name}
//                 </h3>

//                 <p className="text-green-400 font-bold">
//                   ₹{menuItem.price}
//                 </p>

//                 <button
//                   onClick={() => navigate("/dashboard/order")}
//                   className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-amber-600 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50 transition duration-300"
//                 >
//                   Proceed to Order
//                 </button>
//               </div>
//             ) : (
//               <p className="text-gray-400 text-center">
//                 No item selected
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ADMIN FORM */}
//       {user?.accountType === "Admin" && (
//         <div className="max-w-4xl mx-auto mt-20 bg-white/10 backdrop-blur-xl border border-yellow-500/30 p-10 rounded-3xl shadow-2xl">
//           <h2 className="text-3xl font-semibold mb-8 text-yellow-400 text-center">
//             Add Signature Dish
//           </h2>

//           <form onSubmit={submitHandler} className="space-y-6">
//             <input
//               placeholder="Dish Name"
//               className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition"
//               value={formdata.name}
//               onChange={(e) =>
//                 setFormdata({ ...formdata, name: e.target.value })
//               }
//               required
//             />

//             <input
//               placeholder="Price"
//               type="number"
//               className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition"
//               value={formdata.price}
//               onChange={(e) =>
//                 setFormdata({ ...formdata, price: e.target.value })
//               }
//               required
//             />

//             <textarea
//               placeholder="Description"
//               rows="3"
//               className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition"
//               value={formdata.description}
//               onChange={(e) =>
//                 setFormdata({
//                   ...formdata,
//                   description: e.target.value,
//                 })
//               }
//               required
//             />

//             <Upload
//               onChange={(file) =>
//                 setFormdata({ ...formdata, image: file })
//               }
//             />

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 py-4 rounded-2xl font-semibold hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/50 transition duration-300"
//             >
//               Add to Menu
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMenu, getAllMenus, deleteMenu } from "../../services/menuApi";
import { setMenuItem } from "../../slices/menuSlice";
import { useNavigate } from "react-router-dom";
import Upload from "./Upload";

export default function MenuContainer() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { menu, menuItem } = useSelector((state) => state.menu);
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (token) dispatch(getAllMenus(token));
  }, [dispatch, token]);

  function submitHandler(e) {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formdata).forEach((key) => {
      if (formdata[key] !== null) {
        data.append(key, formdata[key]);
      }
    });

    dispatch(createMenu(data, token));

    setFormdata({
      name: "",
      price: "",
      description: "",
      image: null,
    });
  }

  function deleteHandler(menuId) {
    dispatch(deleteMenu(menuId, token));
  }

  function orderhandler(item) {
    dispatch(setMenuItem(item));
    navigate("/dashboard/order");
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white
                 px-4 sm:px-6 lg:px-10
                 py-8 sm:py-12 md:py-16 overflow-x-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* HEADER */}
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-yellow-400">
          Royal Gourmet Menu
        </h1>
        <p className="text-gray-300 mt-2 text-xs sm:text-sm md:text-lg">
          Premium Cuisine • Luxury Dining • Signature Experience
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-10">

        {/* MENU LIST */}
        <div className="xl:col-span-2 space-y-5 sm:space-y-6 md:space-y-8 order-2 xl:order-1">
          {menu?.map((m) => (
            <div
              key={m._id}
              onClick={() => orderhandler(m)}
              className="group bg-white/10 backdrop-blur-lg
                         border border-white/20
                         rounded-2xl md:rounded-3xl
                         overflow-hidden shadow-xl
                         hover:-translate-y-2
                         transition duration-500 cursor-pointer"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">

                {m.image && (
                  <div className="overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-40 sm:h-48 md:h-60 object-cover
                                 group-hover:scale-110 transition duration-700"
                    />
                  </div>
                )}

                <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center space-y-2 sm:space-y-3 md:space-y-4">
                  <h2 className="text-lg sm:text-xl md:text-3xl font-semibold text-yellow-400">
                    {m.name}
                  </h2>

                  <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                    {m.description}
                  </p>

                  <p className="text-base sm:text-lg md:text-2xl text-green-400 font-semibold">
                    ₹{m.price}
                  </p>

                  {user?.accountType === "Admin" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHandler(m._id);
                      }}
                      className="w-full sm:w-auto px-4 py-2
                                 bg-red-600 rounded-lg
                                 hover:bg-red-700 transition text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CART SECTION */}
        <div className="order-1 xl:order-2">
          <div
            className="bg-white/10 backdrop-blur-xl
                       border border-yellow-500/30
                       p-4 sm:p-6 md:p-8
                       rounded-2xl md:rounded-3xl shadow-xl
                       xl:sticky xl:top-10"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-yellow-400 text-center">
              🛒 Your Cart
            </h2>

            {menuItem ? (
              <div className="space-y-3 md:space-y-4">
                <img
                  src={menuItem.image}
                  alt={menuItem.name}
                  className="w-full h-28 sm:h-36 md:h-40 object-cover rounded-xl"
                />

                <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                  {menuItem.name}
                </h3>

                <p className="text-green-400 font-bold text-sm sm:text-base">
                  ₹{menuItem.price}
                </p>

                <button
                  onClick={() => navigate("/dashboard/order")}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600
                             py-2 sm:py-3 rounded-xl font-semibold
                             hover:scale-105 transition duration-300
                             text-xs sm:text-sm md:text-base"
                >
                  Proceed to Order
                </button>
              </div>
            ) : (
              <p className="text-gray-400 text-center text-sm">
                No item selected
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ADMIN FORM */}
      {user?.accountType === "Admin" && (
        <div
          className="max-w-4xl mx-auto mt-12 md:mt-20
                     bg-white/10 backdrop-blur-xl
                     border border-yellow-500/30
                     p-4 sm:p-6 md:p-10
                     rounded-2xl md:rounded-3xl shadow-xl"
        >
          <h2 className="text-lg sm:text-xl md:text-3xl font-semibold mb-6 md:mb-8 text-yellow-400 text-center">
            Add Signature Dish
          </h2>

          <form onSubmit={submitHandler} className="space-y-4 md:space-y-6">
            <input
              placeholder="Dish Name"
              value={formdata.name}
              onChange={(e) =>
                setFormdata({ ...formdata, name: e.target.value })
              }
              className="w-full bg-white/10 border border-white/20
                         px-4 py-2 sm:py-3 rounded-xl
                         focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={formdata.price}
              onChange={(e) =>
                setFormdata({ ...formdata, price: e.target.value })
              }
              className="w-full bg-white/10 border border-white/20
                         px-4 py-2 sm:py-3 rounded-xl
                         focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />

            <textarea
              rows="3"
              placeholder="Description"
              value={formdata.description}
              onChange={(e) =>
                setFormdata({
                  ...formdata,
                  description: e.target.value,
                })
              }
              className="w-full bg-white/10 border border-white/20
                         px-4 py-2 sm:py-3 rounded-xl
                         focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />

            <Upload
              onChange={(file) =>
                setFormdata({ ...formdata, image: file })
              }
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600
                         py-3 rounded-xl font-semibold
                         hover:scale-105 transition duration-300"
            >
              Add to Menu
            </button>
          </form>
        </div>
      )}
    </div>
  );
}