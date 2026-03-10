import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createTable,
  getalltable,
  updateTableStatus,
  deleteTable,
} from "../../services/tableApi";
import { setTable, setEditTable } from "../../slices/tableSlice";
import Upload from "./Upload";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../comman/ConfirmationModal";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function getSeatingTag(capacity) {
  if (Number(capacity) >= 8) return "Large Group";
  if (Number(capacity) >= 5) return "Family";
  return "Cozy";
}

function convertWordToNumber(text) {
  const numberWords = {
    'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
    'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
    'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13',
    'fourteen': '14', 'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
    'eighteen': '18', 'nineteen': '19', 'twenty': '20'
  };
  
  const lowerText = text.toLowerCase().trim();
  
  // Check if entire text is a number word
  if (numberWords[lowerText]) {
    return numberWords[lowerText];
  }
  
  // Check if text contains "table" or "room" and then a number word
  const words = lowerText.split(/\s+/);
  for (const word of words) {
    if (numberWords[word]) {
      return numberWords[word];
    }
  }
  
  return text;
}

function calculateTablePrice(table) {
  // If table has a price set, use it
  if (table.price && table.price > 0) {
    return Number(table.price);
  }
  
  // Calculate dynamic price based on capacity
  const capacity = Number(table.capacity || 4);
  let basePrice = 500;
  
  if (capacity >= 8) {
    basePrice = 1200; // Large Group
  } else if (capacity >= 5) {
    basePrice = 900; // Family
  } else {
    basePrice = 600; // Cozy
  }
  
  return basePrice;
}

function normalizeTableStatus(status) {
  const value = String(status || "available").toLowerCase();
  if (value === "available") return "available";
  return "unavailable";
}

function getPopularityScore(table) {
  const capacity = Number(table.capacity || 0);
  const tableNum = Number(table.tableNumber || 0);
  const price = calculateTablePrice(table);
  const isAvailable = normalizeTableStatus(table.status) === "available" ? 1 : 0;

  // Higher capacity + currently available + better value + slight table variance.
  const valueScore = price > 0 ? 2000 / price : 0;
  const variance = (tableNum % 7) * 0.1;

  return capacity * 10 + isAvailable * 5 + valueScore + variance;
}

export default function Tablecontainer() {
  const { token, user } = useSelector((state) => state.auth);
  const { tables, table, edittable } = useSelector((state) => state.table);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTableNo, setSearchTableNo] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [formdata, setFormdata] = useState({
    tableNumber: "",
    capacity: "",
    status: "available",
    image: null,
  });

  useEffect(() => {
    if (token) dispatch(getalltable(token));
  }, [dispatch, token]);

  function handleBookTable(tableId) {
    if (user?.accountType === "Admin") {
      return; // Admins cannot book tables
    }
    const selectedTable = tables.find((t) => t._id === tableId);
    if (selectedTable) {
      navigate("/dashboard/tablebooking", { state: { table: selectedTable } });
    }
  }

  function changehandler(e) {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formdata).forEach((key) => {
      if (formdata[key] !== null) {
        data.append(key, formdata[key]);
      }
    });

    if (edittable && table?._id) {
      dispatch(updateTableStatus(table._id, data, token));
    } else {
      dispatch(createTable(data, token));
    }

    setFormdata({
      tableNumber: "",
      capacity: "",
      status: "available",
      image: null,
    });

    dispatch(setEditTable(false));
  }

  function editHandler(selectedTable) {
    dispatch(setTable(selectedTable));
    dispatch(setEditTable(true));

    setFormdata({
      tableNumber: selectedTable.tableNumber,
      capacity: selectedTable.capacity,
      status: selectedTable.status,
      image: null,
    });
  }

  function deleteHandler(tableId, tableNumber) {
    setConfirmationModal({
      text1: "Delete Table",
      text2: `Are you sure you want to delete Table ${tableNumber}? This action cannot be undone.`,
      btn1Text: "Delete",
      btn2Text: "Cancel",
      btn1Handler: () => confirmDeleteTable(tableId, tableNumber),
      btn2Handler: () => setConfirmationModal(null),
    });
  }

  async function confirmDeleteTable(tableId, tableNumber, force = false) {
    setConfirmationModal(null);
    
    const result = await dispatch(deleteTable(tableId, token, force));
    
    // If deletion requires force (has active bookings)
    if (result?.requiresForce) {
      setConfirmationModal({
        text1: "Table Has Active Bookings",
        text2: `Table ${tableNumber} has ${result.activeBookingsCount} active booking(s). Deleting this table will automatically cancel all these bookings. Do you want to continue?`,
        btn1Text: "Yes, Delete & Cancel Bookings",
        btn2Text: "No, Keep Table",
        btn1Handler: () => confirmDeleteTable(tableId, tableNumber, true),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  }

  const filteredTables = tables.filter((t) => {
    const query = searchTableNo.trim().toLowerCase();
    if (!query) return true;
    
    const convertedQuery = convertWordToNumber(query);
    
    return (
      t.tableNumber.toString().includes(query) ||
      t.tableNumber.toString().includes(convertedQuery) ||
      getSeatingTag(t.capacity).toLowerCase().includes(query)
    );
  });

  const sortedTables = [...filteredTables].sort((a, b) => {
    if (sortBy === "capacity") return Number(b.capacity || 0) - Number(a.capacity || 0);
    if (sortBy === "table") return Number(a.tableNumber || 0) - Number(b.tableNumber || 0);
    if (sortBy === "available") {
      const avA = normalizeTableStatus(a.status) === "available" ? 1 : 0;
      const avB = normalizeTableStatus(b.status) === "available" ? 1 : 0;

      if (avA !== avB) {
        return avB - avA;
      }

      return getPopularityScore(b) - getPopularityScore(a);
    }

    // Popularity: highest score first.
    if (sortBy === "popular") {
      return getPopularityScore(b) - getPopularityScore(a);
    }

    return Number(a.tableNumber || 0) - Number(b.tableNumber || 0);
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(1200px_500px_at_-10%_-10%,#c7f9cc_0%,#f8f9fa_55%,#eef2ff_100%)] px-3 sm:px-6 lg:px-8 py-6 md:py-10 text-gray-900">
      <div className="w-full">
        <div className="mb-4 text-sm text-gray-500">Dashboard &gt; Dining Tables &gt; Reservations</div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Restaurant Tables ({sortedTables.length})</h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray-600">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm min-w-36"
            >
              <option value="popular">Popularity</option>
              <option value="available">Availability</option>
              <option value="capacity">Capacity</option>
              <option value="table">Table Number</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <section className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-3">
              <input
                type="text"
                placeholder="Search by table number (e.g., '3' or 'three') or type (Cozy/Family/Large Group)..."
                value={searchTableNo}
                onChange={(e) => setSearchTableNo(e.target.value)}
                className="w-full bg-transparent px-2 py-2 outline-none"
              />
            </div>

            <div
              className="space-y-4 sm:space-y-6"
            >
            {sortedTables.map((t) => {
              const image =
                t.image ||
                "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80";
              const tablePrice = calculateTablePrice(t);
              // Calculate varied discount based on table characteristics
              const capacity = Number(t.capacity || 4);
              const tableNum = Number(t.tableNumber || 1);
              
              // Base discount varies by capacity tier
              let discountPercent;
              if (capacity >= 8) {
                discountPercent = 20 + (tableNum % 5) * 2; // 20-28% for large groups
              } else if (capacity >= 5) {
                discountPercent = 15 + (tableNum % 5) * 2; // 15-23% for family
              } else {
                discountPercent = 10 + (tableNum % 6) * 2; // 10-20% for cozy
              }
              
              const oldPrice = Math.round(tablePrice / (1 - discountPercent / 100));
              const seatingTag = getSeatingTag(t.capacity);
              const tableStatus = normalizeTableStatus(t.status);

              return (
                <article 
                  key={t._id} 
                  className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[44%_56%]">
                    
                    {/* Image Section */}
                    <div className="relative h-44 sm:h-52 md:h-60 lg:h-full bg-gray-100">
                      <img
                        src={image}
                        alt={`Table ${t.tableNumber}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />

                      <div className="absolute top-3 left-3 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                        {seatingTag}
                      </div>

                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white ${
                            tableStatus === "available" ? "bg-amber-500" : "bg-gray-600"
                          }`}
                        >
                          {tableStatus === "available" ? "Pending" : "Unavailable"}
                        </span>
                      </div>

                      {/* Keep image clean on mobile; actions are in the card footer buttons. */}
                    </div>

                    <div className="p-4 sm:p-5 md:p-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">📍 Luxury Hotel</p>
                          <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-gray-900 mt-1">
                            Table #{t.tableNumber}
                          </h2>
                          <p className="text-sm text-gray-600 mt-1">
                            Capacity {t.capacity} guests • City View
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-700">
                            <span className="inline-flex items-center bg-emerald-600 text-white px-2.5 py-0.5 rounded-sm font-semibold">
                              {(3.9 + (Number(t.tableNumber || 1) % 8) / 10).toFixed(1)}
                            </span>
                            <span>Reception</span>
                            <span className="hidden sm:inline">Family Space</span>
                          </div>

                          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300">
                            <p className="text-xs text-gray-600 mb-1">Total Price</p>
                            <div className="flex flex-wrap items-end gap-2">
                              <span className="text-3xl font-bold text-emerald-600 leading-none">
                                ${formatCurrency(tablePrice)}
                              </span>
                              <span className="text-sm text-gray-500">/ slot</span>
                              <span className="hidden sm:inline text-lg line-through text-gray-400 font-semibold">
                                ${formatCurrency(oldPrice)}
                              </span>
                              <span className="text-sm text-orange-500 font-semibold">
                                {discountPercent}% off
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                          {user?.accountType === "Admin" ? (
                            <>
                              <button
                                onClick={() => editHandler(t)}
                                className="w-full sm:flex-1 px-4 py-2.5 rounded-md border border-indigo-500 text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition"
                              >
                                Edit Table
                              </button>
                              <button
                                onClick={() => deleteHandler(t._id, t.tableNumber)}
                                className="w-full sm:flex-1 px-4 py-2.5 rounded-md border border-red-500 text-red-700 text-sm font-semibold hover:bg-red-50 transition"
                              >
                                Delete Table
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleBookTable(t._id)}
                                className="w-full sm:flex-1 px-4 py-2.5 rounded-md border border-gray-400 text-gray-800 text-sm font-semibold hover:bg-gray-50 transition"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => handleBookTable(t._id)}
                                disabled={tableStatus !== "available"}
                                className="w-full sm:flex-1 px-4 py-2.5 rounded-md bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                {tableStatus === "available" ? "Pay Now" : "Unavailable"}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
            </div>
          </section>

          {user?.accountType === "Admin" && (
            <aside className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm lg:sticky lg:top-6 h-fit">
              <h2 className="text-xl font-bold mb-4">
                {edittable ? "Edit Table" : "Create Table"}
              </h2>

              <form onSubmit={submitHandler} className="space-y-4">
                <input
                  name="tableNumber"
                  placeholder="Table Number"
                  value={formdata.tableNumber}
                  onChange={changehandler}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />

                <input
                  type="number"
                  name="capacity"
                  placeholder="Capacity"
                  value={formdata.capacity}
                  onChange={changehandler}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />

                <select
                  name="status"
                  value={formdata.status}
                  onChange={changehandler}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                </select>

                <Upload
                  label="Table Image"
                  onChange={(file) =>
                    setFormdata((prev) => ({
                      ...prev,
                      image: file,
                    }))
                  }
                />

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
                >
                  {edittable ? "Update Table" : "Create Table"}
                </button>
              </form>
            </aside>
          )}
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
