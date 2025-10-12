import { Link } from 'react-router-dom';
import useAuth from '../services/useAuth';
import { useCart } from './CartContext';

const CartDropdown = () => {
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();

  const total = cart?.items?.reduce((acc, item) => acc + item.priceAtPurchase * item.quantity, 0) || 0;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-background-dark rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-20">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Cart</h2>
        {!isAuthenticated ? (
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">Need an account?{' '}
              <Link to="/register" className="text-primary hover:underline">Register!</Link>
            </p>
          </div>
        ) : !cart || cart.items.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">Your cart is empty. Add some products!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {cart.items.map((item) => (
              <div key={item.product.id} className="flex items-center py-4">
                <img alt={item.product.name} className="h-16 w-16 rounded-lg object-cover" src={item.product.imageUrl} />
                <div className="ml-4 flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{item.product.name}</p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">${item.priceAtPurchase.toFixed(2)} x {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isAuthenticated && cart && cart.items.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-bold text-gray-900 dark:text-white">Total</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</p>
          </div>
          <div className="space-y-3">
            <Link to="/checkout" className="block w-full text-center py-3 px-4 rounded-lg bg-primary text-white font-bold text-sm hover:bg-opacity-90 transition-colors">
              Checkout
            </Link>
            <Link to="/cart" className="block w-full text-center py-3 px-4 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary font-bold text-sm hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
              Manage Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
