import React from "react";

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {modalData?.text1}
        </h2>
        <p className="text-gray-600 mb-6">
          {modalData?.text2}
        </p>
        <div className="flex gap-3">
          <button
            onClick={modalData?.btn1Handler}
            className="flex-1 bg-red-600 text-white py-2.5 px-4 rounded-md font-semibold hover:bg-red-700 transition"
          >
            {modalData?.btn1Text}
          </button>
          <button
            onClick={modalData?.btn2Handler}
            className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-md font-semibold hover:bg-gray-300 transition"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
