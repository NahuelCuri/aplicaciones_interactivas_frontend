import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated } from '../app/features/auth/authSlice';
import { selectCart, removeItemFromCart, fetchCart } from '../app/features/cart/cartSlice';

const CartDropdown = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cart = useSelector(selectCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const isItemUnavailable = (item) => item.product.deleted || item.product.stock < item.quantity;

  const subtotal = cart?.items?.reduce((acc, item) => {
    return isItemUnavailable(item) ? acc : acc + item.priceAtPurchase * item.quantity;
  }, 0) || 0;
  
  const hasUnavailableItems = cart?.items?.some(isItemUnavailable) || false;

  const handleCheckout = () => {
    if (hasUnavailableItems) {
      alert("Please remove unavailable items from your cart before proceeding.");
      return;
    }
    navigate('/checkout');
  };

  const handleRemove = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

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
            {cart.items.map((item) => {
              const unavailable = isItemUnavailable(item);
              return (
                <div key={item.product.id} className="flex items-center py-4">
                  <img alt={item.product.name} className={`h-16 w-16 rounded-lg object-cover ${unavailable ? 'opacity-50' : ''}`} src={item.product.mainImageBase64 ? `data:image/jpeg;base64,${item.product.mainImageBase64}` : ''} />
                  <div className="ml-4 flex-1 flex flex-col items-start">
                    <p className={`font-medium text-gray-900 dark:text-white ${unavailable ? 'opacity-50' : ''}`}>{item.product.name}</p>
                    <p className={`text-sm text-gray-500 dark:text-gray-400 ${unavailable ? 'opacity-50' : ''}`}>${item.priceAtPurchase.toFixed(2)} x {item.quantity}</p>
                    {unavailable && <p className="text-xs text-red-500">{item.product.deleted ? 'Not available' : 'Out of stock'}</p>}
                    <button onClick={() => handleRemove(item.product.id)} className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 mt-1">Remove</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      {isAuthenticated && cart && cart.items.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-bold text-gray-900 dark:text-white">Total</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</p>
          </div>
          {hasUnavailableItems && (
            <p className="mb-4 text-sm text-red-600">
              Some items are unavailable. Please manage your cart.
            </p>
          )}
          <div className="space-y-3">
            <button 
              onClick={handleCheckout}
              disabled={hasUnavailableItems}
              className="w-full text-center py-3 px-4 rounded-lg bg-primary text-white font-bold text-sm hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
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
