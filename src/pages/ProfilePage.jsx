import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useAuth } from "../services/AuthContext";
import orderService from "../services/orderService";

const statusColors = {
  Shipped: "bg-blue-100/80 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
  Delivered: "bg-green-100/80 text-green-800 dark:bg-green-900/50 dark:text-green-200",
  Cancelled: "bg-red-100/80 text-red-800 dark:bg-red-900/50 dark:text-red-200",
  PENDING: "bg-yellow-100/80 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200",
};


const ProfilePage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.id) {
        try {
          const response = await orderService.getOrdersByUser(user.id);
          setOrders(response.data);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <p>Loading profile...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Account</h2>
              <p className="text-gray-500 dark:text-gray-400">Manage your profile and view your order history.</p>
            </div>

            <div className="rounded-xl border border-gray-200/80 dark:border-gray-700/50 bg-white/50 dark:bg-background-dark/50 p-6 shadow-sm">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <img alt="User profile picture" className="h-24 w-24 rounded-full" src={`https://i.pravatar.cc/150?u=${user.email}`} />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.username}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
                <button className="flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark">
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Order History</h3>
              <div className="overflow-x-auto rounded-xl border border-gray-200/80 dark:border-gray-700/50 bg-white/50 dark:bg-background-dark/50 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200/80 dark:divide-gray-700/50">
                  <thead className="bg-gray-50 dark:bg-gray-800/20">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">#{order.id}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500 dark:text-gray-400">${order.totalPrice.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
