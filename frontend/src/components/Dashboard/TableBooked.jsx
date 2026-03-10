import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyTableBookings, cancelTableBooking } from "../../services/tablebookingApi";
import { buyTablePayment } from "../../services/paymentapi/TablepaymentApi";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  CreditCard,
  UtensilsCrossed,
  Sparkles,
  X
} from "lucide-react";

export default function TableBooked() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { tablebookings } = useSelector((state) => state.table);

  useEffect(() => {
    if (token) {
      dispatch(getMyTableBookings(token));
    }
  }, [token, dispatch]);

  async function handlePayment(singleBooking) {
    await buyTablePayment(token, user, singleBooking, dispatch);
    dispatch(getMyTableBookings(token));
  }

  async function handleCancel(id) {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;
    try {
      await dispatch(cancelTableBooking(id, token));
    } catch (error) {
      console.error("Cancel failed:", error);
    }
  }

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      paid: { 
        bg: "bg-emerald-100", 
        text: "text-emerald-700", 
        border: "border-emerald-300",
        icon: CheckCircle, 
        label: "Confirmed"
      },
      active: { 
        bg: "bg-blue-100", 
        text: "text-blue-700", 
        border: "border-blue-300",
        icon: CheckCircle, 
        label: "Active" 
      },
      pending: { 
        bg: "bg-amber-100", 
        text: "text-amber-700", 
        border: "border-amber-300",
        icon: AlertCircle, 
        label: "Pending" 
      },
      cancelled: { 
        bg: "bg-red-100", 
        text: "text-red-700", 
        border: "border-red-300",
        icon: XCircle, 
        label: "Cancelled" 
      }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${config.bg} border ${config.border} ${config.text} text-xs font-semibold shadow-sm`}
      >
        <Icon size={14} />
        {config.label}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-50">
      
      {/* Hero Section with Background */}
      <div className="relative h-[300px] md:h-[350px] mb-8 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&auto=format&fit=crop"
          alt="Restaurant Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <UtensilsCrossed size={48} className="text-amber-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-3">
              My Reservations
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              {tablebookings?.length || 0} Active {tablebookings?.length === 1 ? 'Booking' : 'Bookings'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Empty State */}
      {!tablebookings || tablebookings?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-16 text-center">
            <div className="text-7xl mb-4 animate-bounce">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Reservations Found
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't made any table reservations yet. Browse our available tables to book your next dining experience.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/dashboard/table'}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              View Available Tables
            </motion.button>
          </div>
        </motion.div>
      ) : (
        /* Booking Grid */
        <div>
          <div className="space-y-6">
            {tablebookings?.map((item, index) => {
              const rawStatus = item?.status || item?.paymentStatus || "pending";
              const bookingStatus = String(rawStatus).toLowerCase();
              const canPay = bookingStatus === "pending";
              const canCancel = bookingStatus === "pending";

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:min-h-[400px]">
                    
                    {/* LEFT SIDE - Table Image */}
                    <div className="relative md:w-1/2 h-[300px] md:min-h-[400px] overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                        src={
                          item.table?.image ||
                          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop'
                        }
                        alt={`Table ${item.table?.tableNumber}`}
                        className="w-full h-full object-cover object-center"
                      />
                      
                      {/* Table Number Overlay */}
                      <div className="absolute top-4 left-4">
                        <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-2">
                          <UtensilsCrossed className="text-amber-500" size={16} />
                          <span className="text-sm font-bold text-gray-800">
                            Table {item.table?.tableNumber || item.tableNumber}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <StatusBadge status={bookingStatus} />
                      </div>

                      {/* Capacity Badge */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="text-white" size={16} />
                            <span className="text-white text-sm font-semibold">
                              Capacity: {item.table?.capacity || '2-4'} Guests
                            </span>
                          </div>
                          <span className="text-amber-400 text-xs font-bold uppercase tracking-wide">
                            {item.table?.capacity >= 8 ? "Large Party" : item.table?.capacity >= 5 ? "Family Style" : "Intimate"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE - Booking Details */}
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                      
                      {/* Top Section */}
                      <div>
                        {/* Reservation Header */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Reservation Details</p>
                            <p className="text-xs text-gray-500 font-mono">
                              #{item._id?.slice(-8).toUpperCase()}
                            </p>
                          </div>
                          <h2 className="text-3xl font-bold text-gray-900">
                            Table {item.table?.tableNumber || item.tableNumber}
                          </h2>
                          <p className="text-gray-600 text-sm mt-1">
                            {item.table?.capacity >= 8 ? "Large Party Seating" : item.table?.capacity >= 5 ? "Family Dining Table" : "Intimate Dining Experience"}
                          </p>
                        </div>

                        {/* Booking Details Grid */}
                        <div className="space-y-3">
                          
                          {/* Date & Time Row */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
                              <Calendar className="text-blue-600" size={18} />
                              <div>
                                <p className="text-xs text-blue-700 font-semibold">Reservation Date</p>
                                <p className="text-sm font-bold text-gray-900">
                                  {item.date ? new Date(item.date).toLocaleDateString('en-US', { 
                                    month: 'short',
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  }) : "—"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 border border-purple-200">
                              <Clock className="text-purple-600" size={18} />
                              <div>
                                <p className="text-xs text-purple-700 font-semibold">Time Slot</p>
                                <p className="text-sm font-bold text-gray-900 capitalize">
                                  {item.timeSlot || "—"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Guests Count */}
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                            <Users className="text-emerald-600" size={18} />
                            <div>
                              <p className="text-xs text-emerald-700 font-semibold">Number of Guests</p>
                              <p className="text-sm font-bold text-gray-900">
                                {item.guests || item.guestCount || "—"} guests
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section - Price & Actions */}
                      <div className="space-y-4 mt-6">
                        
                        {/* Price Display */}
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-emerald-700 font-semibold mb-1">Total Amount</p>
                              <p className="text-3xl font-bold text-emerald-600">
                                ${(item.amount || item.totalPrice || item.table?.price || 0).toLocaleString()}
                              </p>
                              <p className="text-xs text-emerald-600 mt-1">Includes taxes & fees</p>
                            </div>
                            {canPay ? (
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handlePayment(item)}
                                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                              >
                                <CreditCard size={18} />
                                Pay Now
                              </motion.button>
                            ) : (
                              <div className="p-3 bg-emerald-500 rounded-xl">
                                <DollarSign className="text-white" size={24} />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          {/* Payment Button or Status */}
                          {bookingStatus === "pending" ? (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePayment(item)}
                              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all"
                            >
                              <CreditCard size={20} />
                              <span>Pay Now</span>
                            </motion.button>
                          ) : bookingStatus === "paid" || bookingStatus === "active" ? (
                            <div className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-emerald-200 bg-emerald-50 rounded-2xl text-emerald-700 font-bold">
                              <CheckCircle size={20} />
                              <span>Payment Completed</span>
                            </div>
                          ) : bookingStatus === "cancelled" ? (
                            <div className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-red-200 bg-red-50 rounded-2xl text-red-700 font-bold">
                              <XCircle size={20} />
                              <span>Reservation Cancelled</span>
                            </div>
                          ) : (
                            <div className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-amber-200 bg-amber-50 rounded-2xl text-amber-700 font-bold">
                              <AlertCircle size={20} />
                              <span>Payment Failed - Try Again</span>
                            </div>
                          )}

                          {/* Cancel Button */}
                          {canCancel && bookingStatus !== "cancelled" && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleCancel(item._id)}
                              className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-red-500 text-red-600 font-semibold rounded-2xl hover:bg-red-50 transition-all"
                            >
                              <X size={18} />
                              <span>Cancel Reservation</span>
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
