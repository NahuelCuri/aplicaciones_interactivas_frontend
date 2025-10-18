const DeleteCategoryConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-xl bg-card-light dark:bg-card-dark shadow-lg">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Are you sure?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">This action is irreversible. Deleting the category will also delete all associated products.</p>
          <div className="flex justify-end gap-4">
            <button 
              onClick={onCancel} 
              className="px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm} 
              className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium flex items-center gap-2"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryConfirmationModal;
