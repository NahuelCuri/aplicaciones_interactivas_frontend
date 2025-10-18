import { useState, useEffect } from 'react';

const EditUserModal = ({ user, onClose, onSave }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [roles, setRoles] = useState(user.roles.map(role => role.name));
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = "Username is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is not valid";
    }
    return newErrors;
  };

  const handleRoleChange = (role) => {
    setRoles(prevRoles => 
      prevRoles.includes(role) 
        ? prevRoles.filter(r => r !== role) 
        : [...prevRoles, role]
    );
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(user.id, { username, email, roles });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-xl bg-card-light dark:bg-card-dark shadow-lg">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">Edit User</p>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Update user details below.</p>
          <div className="space-y-6">
            <label className="flex flex-col">
              <p className="text-base font-medium text-gray-900 dark:text-white pb-2">Username</p>
              <input 
                className={`form-input w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary h-12 px-3 ${errors.username ? 'border-red-500' : ''}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </label>
            <label className="flex flex-col">
              <p className="text-base font-medium text-gray-900 dark:text-white pb-2">Email</p>
              <input 
                className={`form-input w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary h-12 px-3 ${errors.email ? 'border-red-500' : ''}`}
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </label>
            <div>
              <p className="text-base font-medium text-gray-900 dark:text-white pb-2">Roles</p>
              <div className="space-y-2">
                <label className="flex items-center gap-x-3">
                  <input 
                    className="h-5 w-5 rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary"
                    type="checkbox" 
                    checked={roles.includes('ADMIN')}
                    onChange={() => handleRoleChange('ADMIN')}
                  />
                  <p className="text-gray-900 dark:text-white">Admin</p>
                </label>
                <label className="flex items-center gap-x-3">
                  <input 
                    className="h-5 w-5 rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary"
                    type="checkbox" 
                    checked={roles.includes('SELLER')}
                    onChange={() => handleRoleChange('SELLER')}
                  />
                  <p className="text-gray-900 dark:text-white">Seller</p>
                </label>
                <label className="flex items-center gap-x-3">
                  <input 
                    className="h-5 w-5 rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary"
                    type="checkbox" 
                    checked={roles.includes('BUYER')}
                    onChange={() => handleRoleChange('BUYER')}
                  />
                  <p className="text-gray-900 dark:text-white">Buyer</p>
                </label>
              </div>
            </div>
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
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};export default EditUserModal;
