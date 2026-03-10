// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createMenu, getAllMenus, deleteMenu } from "../../services/menuApi";
// import { setMenuItem } from "../../slices/menuSlice";
// import { useNavigate } from "react-router-dom";
// import Upload from "./Upload";

// function formatCurrency(amount) {
//   return new Intl.NumberFormat("en-IN", {
//     maximumFractionDigits: 0,
//   }).format(Number(amount || 0));
// }

// export default function MenuContainer() {
//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);
//   const { menu } = useSelector((state) => state.menu);
//   const navigate = useNavigate();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [formdata, setFormdata] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image: null,
//   });

//   useEffect(() => {
//     if (token) dispatch(getAllMenus(token));
//   }, [dispatch, token]);

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
//     if (!window.confirm("Delete this dish from menu?")) return;
//     dispatch(deleteMenu(menuId, token));
//   }

//   function orderHandler(item) {
//     dispatch(setMenuItem(item));
//     navigate("/dashboard/order");
//   }

//   const filteredMenu = menu?.filter((m) => {
//     if (!searchQuery.trim()) return true;
//     const query = searchQuery.toLowerCase();
//     return (
//       m.name?.toLowerCase().includes(query) ||
//       m.description?.toLowerCase().includes(query)
//     );
//   });

//   return (
//     <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 px-3 sm:px-6 lg:px-10 py-8 md:py-10">
//       <div className="w-full">
//         <div className="mb-4 text-sm text-gray-500">Dashboard &gt; Restaurant &gt; Menu</div>

//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-4 mb-6">
//           <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
//             Restaurant Menu ({filteredMenu?.length || 0})
//           </h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
//           <section className="space-y-6">
//             {/* Search Bar */}
//             <div className="bg-white rounded-xl border border-gray-200 p-3">
//               <input
//                 type="text"
//                 placeholder="Search dishes by name or description..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-transparent px-2 py-2 outline-none text-gray-900"
//               />
//             </div>

//             {/* Menu Grid */}
//             {filteredMenu?.length === 0 ? (
//               <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
//                 <div className="text-6xl mb-4">🍽️</div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   No menu items yet
//                 </h3>
//                 <p className="text-gray-500">
//                   {user?.accountType === "Admin"
//                     ? "Add your first dish using the form →"
//                     : "Menu items will appear here when added by admin"}
//                 </p>
//               </div>
//             ) : (
//               <div 
//                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
//               >
//                 {filteredMenu?.map((m) => (
//                   <article
//                     key={m._id}
//                     className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex flex-col h-full z-0"
//                   >
//                     <div className="relative h-48">
//                       <img
//                         src={m.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"}
//                         alt={m.name}
//                         className="w-full h-full object-cover"
//                       />
//                       <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                         ${formatCurrency(m.price)}
//                       </div>
//                     </div>

//                     <div className="p-4 flex flex-col grow">
//                       <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
//                         {m.name}
//                       </h2>
//                       <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//                         {m.description || "Delicious dish from our kitchen"}
//                       </p>

//                       <div className="flex gap-2 mt-auto pt-4 relative z-10">
//                         {user?.accountType === "Admin" ? (
//                           <button
//                             onClick={() => deleteHandler(m._id)}
//                             className="flex-1 px-4 py-2 rounded-md border border-red-500 text-red-600 font-semibold hover:bg-red-50 transition"
//                           >
//                             Delete
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => orderHandler(m)}
//                             className="flex-1 px-4 py-2 rounded-md bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
//                           >
//                             Order Now
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* Admin Form Sidebar */}
//           {user?.accountType === "Admin" && (
//             <aside 
//               className="lg:sticky lg:top-6 lg:self-start"
//             >
//               <div 
//                 className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
//               >
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">
//                   Add New Dish
//                 </h2>

//                 <form onSubmit={submitHandler} className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Dish Name *
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g., Butter Chicken"
//                       value={formdata.name}
//                       onChange={(e) =>
//                         setFormdata({ ...formdata, name: e.target.value })
//                       }
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Price ($) *
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g., 250"
//                       value={formdata.price}
//                       onChange={(e) =>
//                         setFormdata({ ...formdata, price: e.target.value })
//                       }
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Description *
//                     </label>
//                     <textarea
//                       placeholder="Describe the dish..."
//                       rows="3"
//                       value={formdata.description}
//                       onChange={(e) =>
//                         setFormdata({ ...formdata, description: e.target.value })
//                       }
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       required
//                     />
//                   </div>

//                   <Upload
//                     label="Dish Image *"
//                     onChange={(file) =>
//                       setFormdata({ ...formdata, image: file })
//                     }
//                   />

//                   <button
//                     type="submit"
//                     className="w-full bg-orange-600 text-white py-2.5 rounded-md font-semibold hover:bg-orange-700 transition"
//                   >
//                     Add to Menu
//                   </button>
//                 </form>
//               </div>
//             </aside>
//           )}
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
// import { motion } from "framer-motion";
// import { Search, Star, ChefHat, Trash2, Plus, Sparkles } from "lucide-react";
// import Upload from "./Upload";

// function formatCurrency(amount) {
//   return new Intl.NumberFormat("en-IN", {
//     maximumFractionDigits: 0,
//   }).format(Number(amount || 0));
// }

// export default function MenuContainer() {
//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);
//   const { menu } = useSelector((state) => state.menu);
//   const navigate = useNavigate();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [formdata, setFormdata] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image: null,
//   });

//   useEffect(() => {
//     if (token) dispatch(getAllMenus(token));
//   }, [dispatch, token]);

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
//     if (!window.confirm("Delete this dish from menu?")) return;
//     dispatch(deleteMenu(menuId, token));
//   }

//   function orderHandler(item) {
//     dispatch(setMenuItem(item));
//     navigate("/dashboard/order");
//   }

//   const filteredMenu = menu?.filter((m) => {
//     if (!searchQuery.trim()) return true;
//     const query = searchQuery.toLowerCase();
//     return (
//       m.name?.toLowerCase().includes(query) ||
//       m.description?.toLowerCase().includes(query)
//     );
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50 to-slate-100 px-4 sm:px-6 lg:px-8 py-10 text-black">

//       <div className="max-w-7xl mx-auto">

//         {/* Hero Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-10"
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <div className="p-3 bg-yellow-500 rounded-xl shadow-lg">
//               <ChefHat className="text-white" size={32} />
//             </div>
//             <div>
//               <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold">
//                 Gourmet Menu
//               </h1>
//               <p className="text-gray-600 text-lg">
//                 Exquisite dishes crafted by our master chefs ({filteredMenu?.length || 0} items)
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

//           {/* LEFT SIDE - MENU GRID */}
//           <section className="space-y-6">

//             {/* Premium Search Bar */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="relative bg-white rounded-2xl shadow-lg border border-gray-200"
//             >
//               <div className="flex items-center gap-3 px-5 py-4">
//                 <Search className="text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder="Search for your favorite dishes..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="flex-1 outline-none text-gray-900 placeholder-gray-400"
//                 />
//               </div>
//             </motion.div>

//             {/* Empty State */}
//             {filteredMenu?.length === 0 ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white rounded-3xl border border-gray-200 p-16 text-center shadow-lg"
//               >
//                 <div className="text-7xl mb-4 animate-bounce">🍽️</div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                   No dishes found
//                 </h3>
//                 <p className="text-gray-600">
//                   {user?.accountType === "Admin"
//                     ? "Start building your menu by adding delicious dishes →"
//                     : "Check back soon for amazing culinary experiences"}
//                 </p>
//               </motion.div>
//             ) : (
//               /* Premium Menu Cards Grid */
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {filteredMenu?.map((m, index) => (
//                   <motion.article
//                     key={m._id}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true, amount: 0.2 }}
//                     transition={{ duration: 0.5, delay: index * 0.05 }}
//                     whileHover={{ y: -8, scale: 1.02 }}
//                     className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
//                   >

//                     {/* Image Section with Zoom Effect */}
//                     <div className="relative z-20 h-44 sm:h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      
//                       {/* Overlay Gradient */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                       <motion.img
//                         src={
//                           m.image ||
//                           "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
//                         }
//                         alt={m.name}
//                         className="relative z-20 w-full h-full object-cover object-[center_18%] scale-125"
//                         whileHover={{ scale: 1.35 }}
//                         transition={{ duration: 0.6 }}
//                       />

//                       {/* Floating Price Badge with Glow */}
//                       <div className="absolute top-4 right-4 z-20">
//                         <motion.div
//                           whileHover={{ scale: 1.1, rotate: 5 }}
//                           className="relative"
//                         >
//                           <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-md opacity-75"></div>
//                           <div className="relative px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-bold text-sm shadow-2xl">
//                             ${formatCurrency(m.price)}
//                           </div>
//                         </motion.div>
//                       </div>

//                       {/* Chef's Special Badge */}
//                       <div className="absolute top-4 left-4 z-20">
//                         <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold shadow-lg">
//                           <Sparkles size={12} />
//                           <span>Fresh</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Content Section */}
//                     <div className="relative z-10 p-5">
                      
//                       {/* Dish Name */}
//                       <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
//                         {m.name}
//                       </h3>

//                       {/* Rating Stars */}
//                       <div className="flex items-center gap-1 mb-3">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             size={14}
//                             className="bg-yellow-500 text-yellow-500 rounded-full p-0.5 shadow-sm "
//                           />
//                         ))}
//                         <span className="text-sm text-gray-600 ml-1">(4.8)</span>
//                       </div>

//                       {/* Description */}
//                       <p className="text-sm text-gray-600 mb-4 line-clamp-2">
//                         {m.description || "A delightful culinary masterpiece prepared with the finest ingredients"}
//                       </p>

//                       {/* Action Buttons */}
//                       <div className="relative z-10 flex gap-2 mt-auto">
//                         {user?.accountType === "Admin" ? (
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => deleteHandler(m._id)}
//                             className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-red-500 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300"
//                           >
//                             <Trash2 size={16} />
//                             Delete
//                           </motion.button>
//                         ) : (
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => orderHandler(m)}
//                             className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-semibold shadow-lg hover:shadow-xl hover:text-black hover:from-amber-500 hover:to-orange-500 transition-all duration-300"
//                           >
//                             Order Now
//                           </motion.button>
//                         )}
//                       </div>

//                     </div>

//                   </motion.article>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* RIGHT SIDE - ADMIN FORM */}
//           {user?.accountType === "Admin" && (
//             <motion.aside
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="lg:sticky lg:top-6 lg:self-start"
//             >

//               <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 overflow-hidden relative">

//                 {/* Background Pattern */}
//                 <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-3xl"></div>

//                 {/* Header */}
//                 <div className="relative z-10 mb-6">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Plus className="text-amber-600" size={24} />
//                     <h2 className="text-2xl font-bold text-gray-900">
//                       Add New Dish
//                     </h2>
//                   </div>
//                   <p className="text-sm text-gray-600">Create a new menu item for your restaurant</p>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={submitHandler} className="space-y-4 relative z-10">

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Dish Name *
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g., Butter Chicken"
//                       value={formdata.name}
//                       onChange={(e) =>
//                         setFormdata({ ...formdata, name: e.target.value })
//                       }
//                       className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-amber-500 transition-colors"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Price ($) *
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g., 299"
//                       value={formdata.price}
//                       onChange={(e) =>
//                         setFormdata({ ...formdata, price: e.target.value })
//                       }
//                       className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-amber-500 transition-colors"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Description *
//                     </label>
//                     <textarea
//                       placeholder="Describe the flavors, ingredients, and what makes it special..."
//                       rows="4"
//                       value={formdata.description}
//                       onChange={(e) =>
//                         setFormdata({ ...formdata, description: e.target.value })
//                       }
//                       className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-amber-500 transition-colors resize-none"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Dish Image *
//                     </label>
//                     <Upload
//                       label="Upload Image"
//                       onChange={(file) =>
//                         setFormdata({ ...formdata, image: file })
//                       }
//                     />
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
//                   >
//                     Add to Menu
//                   </motion.button>

//                 </form>

//               </div>

//             </motion.aside>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMenu, getAllMenus, deleteMenu } from "../../services/menuApi";
import { setMenuItem } from "../../slices/menuSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, ChefHat, Trash2, Plus } from "lucide-react";
import Upload from "./Upload";
import { useDebounce } from "../../utils/useDebounce";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
}

// Memoized star rating component
const StarRating = React.memo(() => (
  <div className="flex items-center gap-1 mb-3">
    {[...Array(5)].map((_,i)=>(
      <Star key={i} size={14} className="text-yellow-400 fill-yellow-400"/>
    ))}
    <span className="text-sm text-gray-500 ml-1">
      (4.8)
    </span>
  </div>
));

StarRating.displayName = 'StarRating';

// Memoized menu card component to prevent unnecessary re-renders
const MenuCard = React.memo(({ m, index, user, deleteHandler, orderHandler }) => {
  return (
    <motion.div
      key={m._id}
      initial={{opacity:0,y:30}}
      animate={{opacity:1,y:0}}
      transition={{delay:index*0.02, duration: 0.3}}
      whileHover={{y:-8}}
      className="glass-card rounded-3xl overflow-hidden premium-shadow luxury-glow border"
    >
      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={m.image}
          alt={m.name}
          loading="lazy"
          className="w-full h-full object-cover transition duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow">
          ${formatCurrency(m.price)}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-lg font-bold mb-1">
          {m.name}
        </h3>

        <StarRating />

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {m.description}
        </p>

        {/* ACTION */}
        {user?.accountType==="Admin" ? (
          <button
            onClick={()=>deleteHandler(m._id)}
            className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 rounded-lg py-2 hover:bg-red-50"
          >
            <Trash2 size={16}/>
            Delete
          </button>
        ) : (
          <button
            onClick={()=>orderHandler(m)}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg font-semibold hover:scale-[1.02]"
          >
            Order Now
          </button>
        )}
      </div>
    </motion.div>
  );
});

MenuCard.displayName = 'MenuCard';

export default function MenuContainer() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth);
  const { menu } = useSelector((state) => state.menu);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [formdata, setFormdata] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const [uploadKey, setUploadKey] = useState(0);

  useEffect(() => {
    if (token) dispatch(getAllMenus(token));
  }, [dispatch, token]);

  const submitHandler = useCallback(async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formdata.name);
    data.append("price", formdata.price);
    data.append("description", formdata.description);
    if (formdata.image) data.append("image", formdata.image);

    await dispatch(createMenu(data, token));

    // Reset form and force Upload component to remount
    setFormdata({
      name: "",
      price: "",
      description: "",
      image: null,
    });
    setUploadKey(prev => prev + 1);
  }, [formdata, token, dispatch]);

  const deleteHandler = useCallback((menuId) => {
    if (!window.confirm("Delete this dish?")) return;
    dispatch(deleteMenu(menuId, token));
  }, [token, dispatch]);

  const orderHandler = useCallback((item) => {
    dispatch(setMenuItem(item));
    navigate("/dashboard/order");
  }, [dispatch, navigate]);

  // Memoize filtered menu to avoid recalculation on every render
  const filteredMenu = useMemo(() => {
    return menu?.filter((m) => {
      if (!debouncedSearchQuery || debouncedSearchQuery.trim() === "") return true;
      const query = debouncedSearchQuery.toLowerCase().trim();
      const name = (m.name || "").toLowerCase();
      const description = (m.description || "").toLowerCase();
      return name.includes(query) || description.includes(query);
    });
  }, [menu, debouncedSearchQuery]);

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex items-center gap-4 mb-10">

          <div className="p-3 bg-amber-500 rounded-xl shadow-lg">
            <ChefHat className="text-white" size={30}/>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gradient-gold">
              Gourmet Menu
            </h1>

            <p className="text-gray-600">
              Premium dishes crafted by our chefs
            </p>
          </div>

        </div>

        {/* SEARCH */}

        <div className="bg-white rounded-xl border shadow-md mb-8 relative z-10">

          <div className="flex items-center gap-3 px-4 py-3">

            <Search className="text-gray-400" size={20}/>

            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-gray-900 bg-transparent placeholder:text-gray-400"
              autoComplete="off"
            />

          </div>

        </div>

        {/* ADMIN PANEL */}

        {user?.accountType==="Admin" &&(

          <div className="glass-card rounded-3xl p-6 premium-shadow mb-8 max-w-xl text-black">

            <div className="flex items-center gap-2 mb-5">

              <Plus className="text-amber-500"/>

              <h2 className="text-xl font-bold">
                Add New Dish
              </h2>

            </div>

            <form onSubmit={submitHandler} className="space-y-4">

              <input
              type="text"
              placeholder="Dish name"
              value={formdata.name}
              onChange={(e)=>setFormdata({...formdata,name:e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
              required
              />

              <input
              type="number"
              placeholder="Price"
              value={formdata.price}
              onChange={(e)=>setFormdata({...formdata,price:e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
              required
              />

              <textarea
              placeholder="Description"
              value={formdata.description}
              onChange={(e)=>setFormdata({...formdata,description:e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
              required
              />

              <Upload
              key={uploadKey}
              label="Upload Image"
              onChange={(file)=>setFormdata({...formdata,image:file})}
              />

              <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold"
              >
                Add Menu Item
              </button>

            </form>

          </div>

        )}

        {/* MENU GRID - FULL WIDTH */}

        {filteredMenu?.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery.trim() ? "No dishes found" : "No menu items yet"}
            </h3>
            <p className="text-gray-500">
              {searchQuery.trim() 
                ? `Try searching for something else` 
                : "Add your first dish to get started"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredMenu?.map((m,index) => (
              <MenuCard
                key={m._id}
                m={m}
                index={index}
                user={user}
                deleteHandler={deleteHandler}
                orderHandler={orderHandler}
              />
            ))}
          </div>
        )}

      </div>

    </div>

  );
}