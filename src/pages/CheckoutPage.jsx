import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import CheckoutOrderSummary from "../components/CheckoutOrderSummary";
import { checkoutCart } from '../app/features/cart/cartSlice';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePlaceOrder = async () => {
    try {
      const resultAction = await dispatch(checkoutCart());
      if (checkoutCart.fulfilled.match(resultAction)) {
        const order = resultAction.payload;
        navigate(`/order-confirmation/${order.id}`);
      }
    } catch (error) {
      console.error('Failed to place order', error);
      // Handle error, e.g., show a notification
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <nav className="flex items-center text-sm">
              <a className="font-medium text-black/50 dark:text-white/50 hover:text-primary" href="/cart">Cart</a>
              <span className="mx-2 text-black/30 dark:text-white/30">/</span>
              <span className="font-medium text-black dark:text-white">Checkout</span>
            </nav>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-black dark:text-white">Checkout</h2>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <ShippingForm />
              <PaymentForm />
            </div>
            <div className="space-y-6">
              <CheckoutOrderSummary />
              <button
                onClick={handlePlaceOrder}
                className="w-full rounded-lg bg-primary py-4 text-center font-bold text-white transition hover:bg-primary/90"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
