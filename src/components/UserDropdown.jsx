import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

const UserDropdown = () => {
  const { user, logout } = useAuth();

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1C1A2E] rounded-xl shadow-lg p-2">
      <div className="p-2">
        <div className="flex items-center gap-4">
          <img alt="User avatar" className="w-10 h-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLkzh9_HW1luSpZQHbHs3tpu0kbjBIw2p6KbfwkgxRZpQngV2ybbjfy-0DVlhjR8NkJeVCtBxGsbhCO0objGQGjWMCLr9LTv25RdX8psrNh4N5CNSMY1jyhRLnJMjK56lstMs3HC_MRFxU0NfpOaAJEKuTJBIHYg4etpznBiQ0sSD8r5p8YPRL_BO0Z2gegW5-iqfDHE8ceyoJCxkOyi39cC2F97RhdLTRjnFc_2ShYd90HHnfgJrYgn0kbZ0N_kANDa18sr6HfNwN" />
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">{user.username}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
      <nav className="flex flex-col gap-1">
        <Link to="/cart" className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors">
          <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
            shopping_cart
          </span>
          <span>Cart</span>
        </Link>
        <Link to="/profile" className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors">
          <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
            account_circle
          </span>
          <span>Profile</span>
        </Link>
      </nav>
      <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
      <a onClick={logout} className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/20 rounded-lg transition-colors cursor-pointer">
        <span className="material-symbols-outlined">
          logout
        </span>
        <span>Log Out</span>
      </a>
    </div>
  );
};

export default UserDropdown;
