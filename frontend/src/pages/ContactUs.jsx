import React, { useState } from "react";
import { submitContactForm } from "../services/contactApi";
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactUs() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      setLoading(true);
      await submitContactForm(formData);
      setFormData(initialState);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden bg-gradient-to-br from-indigo-50 via-orange-50 to-amber-100 text-black">

      {/* Decorative Background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>

      <div className="relative w-full max-w-4xl">

        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-10 md:p-12 transition-all duration-500 hover:shadow-orange-200">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Contact Our Team
            </h1>

            <p className="text-gray-600 mt-4 max-w-lg mx-auto">
              Have questions about bookings, services, or collaborations?
              Send us a message and our team will respond quickly.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={submitHandler}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-400 transition">
                <User className="text-orange-500 mr-3" size={18} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={changeHandler}
                  placeholder="John Smith"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>

              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-400 transition">
                <Mail className="text-indigo-500 mr-3" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="example@email.com"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Phone
              </label>

              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-400 transition">
                <Phone className="text-green-500 mr-3" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={changeHandler}
                  placeholder="+91 98765 43210"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Subject
              </label>

              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-400 transition">
                <MessageSquare className="text-purple-500 mr-3" size={18} />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={changeHandler}
                  placeholder="Booking Inquiry"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={changeHandler}
                rows={5}
                placeholder="Write your message..."
                className="border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none transition"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white font-semibold rounded-xl px-8 py-3 shadow-lg hover:shadow-orange-300 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60"
            >
              <Send size={18} />
              {loading ? "Submitting..." : "Send Message"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
