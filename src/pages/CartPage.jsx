import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { useSelector } from "react-redux";
import { selectCart } from "../app/features/cart/cartSlice";

const CartPage = () => {
  const cart = useSelector(selectCart);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <main className="flex flex-1 justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Cart</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-background-dark rounded-lg shadow">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="col-span-6 text-sm font-medium text-gray-500 dark:text-gray-400">Product</h3>
                  <h3 className="col-span-2 text-sm font-medium text-gray-500 dark:text-gray-400 text-center">Price</h3>
                  <h3 className="col-span-2 text-sm font-medium text-gray-500 dark:text-gray-400 text-center">Quantity</h3>
                  <h3 className="col-span-2 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">Total</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart?.items?.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <OrderSummary cart={cart} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
