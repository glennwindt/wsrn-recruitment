import React from "react";

export default function ConfirmActionModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes, proceed",
  cancelText = "Cancel"
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[400px]">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-3 text-sm text-gray-300">
          {message}
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}