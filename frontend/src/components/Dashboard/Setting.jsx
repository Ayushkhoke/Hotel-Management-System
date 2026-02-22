import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function SettingsPage() {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    phone: user?.phone || "",
    image: null,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleProfileSubmit(e) {
    e.preventDefault();
    console.log("Profile Updated:", formData);
    // 🔥 Later connect backend API here
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    console.log("Password Updated:", passwordData);
    // 🔥 Later connect backend API here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-6 py-16">

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-yellow-400 tracking-wide">
          Account Settings
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your personal information and security
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* PROFILE SECTION */}
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-yellow-500/20">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
            Profile Information
          </h2>

          <form onSubmit={handleProfileSubmit} className="space-y-5">

            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="bg-black/30 px-4 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              />

              <input
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="bg-black/30 px-4 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full bg-black/30 px-4 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
            />

            <input
              type="file"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }))
              }
              className="w-full bg-black/30 px-4 py-2 rounded-lg border border-gray-600"
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 transition py-3 rounded-xl font-semibold"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* PASSWORD SECTION */}
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-yellow-500/20">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
            Change Password
          </h2>

          <form onSubmit={handlePasswordSubmit} className="space-y-5">

            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Current Password"
              className="w-full bg-black/30 px-4 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
            />

            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="w-full bg-black/30 px-4 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
            />

            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm New Password"
              className="w-full bg-black/30 px-4 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 transition py-3 rounded-xl font-semibold"
            >
              Update Password
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
