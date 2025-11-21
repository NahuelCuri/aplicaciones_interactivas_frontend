import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ cart }) => {
  const navigate = useNavigate();
  
  // Calculate subtotal only from available items
  const subtotal = cart?.items?.reduce((acc, item) => {
    return item.product.deleted ? acc : acc + item.priceAtPurchase * item.quantity;
  }, 0) || 0;
  
  const shipping = 0;
  const total = subtotal + shipping;

  // Check if any item in the cart is deleted
  const hasDeletedItems = cart?.items?.some(item => item.product.deleted) || false;

  const handleCheckout = () => {
    if (hasDeletedItems) {
      alert("Please remove unavailable items from your cart before proceeding.");
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="bg-white dark:bg-background-dark rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
          <span className="font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Shipping</span>
          <span className="font-medium text-gray-900 dark:text-white">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
      <div className="flex justify-between text-lg font-bold">
        <span className="text-gray-900 dark:text-white">Total</span>
        <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
      </div>
      {hasDeletedItems && (
        <p className="mt-4 text-sm text-red-600">
          Some items in your cart are no longer available. Please remove them to proceed.
        </p>
      )}
      <button
        onClick={handleCheckout}
        disabled={hasDeletedItems}
        className="mt-6 w-full flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-bold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
