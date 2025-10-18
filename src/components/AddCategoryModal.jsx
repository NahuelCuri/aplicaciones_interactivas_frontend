import { useState } from 'react';

const AddCategoryModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    onSave({ name, description });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-xl bg-card-light dark:bg-card-dark shadow-lg">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">Create Category</p>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="space-y-6">
            <label className="flex flex-col">
              <p className="text-base font-medium text-gray-900 dark:text-white pb-2">Category Name</p>
              <input 
                className="form-input w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary h-12 px-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Electronics"
              />
            </label>
            <label className="flex flex-col">
              <p className="text-base font-medium text-gray-900 dark:text-white pb-2">Description</p>
              <textarea 
                className="form-input w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary h-24 px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Devices and gadgets"
              ></textarea>
            </label>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button 
              className="px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 font-medium"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium flex items-center gap-2 hover:bg-primary/90"
              onClick={handleSave}
            >
              Create Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
