
import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-xl bg-card-light shadow-lg p-8">
        <p className="text-text-primary text-lg font-medium">{message}</p>
        <div className="mt-8 flex justify-end gap-4">
          <button onClick={onCancel} className="px-6 py-3 rounded-lg text-text-primary bg-gray-100 hover:bg-gray-200 font-medium">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-6 py-3 rounded-lg text-white bg-red-600 hover:bg-red-700 font-medium">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
