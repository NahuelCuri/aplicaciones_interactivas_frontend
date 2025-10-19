import { useCart } from "./CartContext";

const CheckoutOrderSummary = () => {
  const { cart } = useCart();
  const subtotal = cart?.items?.reduce((acc, item) => acc + item.priceAtPurchase * item.quantity, 0) || 0;
  const shipping = 0; // Assuming free shipping for now
  const total = subtotal + shipping;

  return (
    <section>
      <h3 className="mb-4 text-lg font-bold text-black dark:text-white">Order Summary</h3>
      <div className="space-y-4 rounded-lg border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-background-dark">
        <ul className="space-y-4">
          {cart?.items?.map((item) => (
            <li key={item.product.id} className="flex items-center gap-4">
              <div
                className="h-16 w-16 flex-shrink-0 rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(data:image/jpeg;base64,${item.product.mainImageBase64})` }}
              ></div>
              <div className="flex-1">
                <p className="font-medium text-black dark:text-white">{item.product.name}</p>
                <p className="text-sm text-black/60 dark:text-white/60">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-black dark:text-white">${(item.priceAtPurchase * item.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <div className="space-y-2 border-t border-black/10 pt-4 dark:border-white/10">
          <div className="flex justify-between text-sm">
            <p className="text-black/60 dark:text-white/60">Subtotal</p>
            <p className="font-medium text-black dark:text-white">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-black/60 dark:text-white/60">Shipping</p>
            <p className="font-medium text-black dark:text-white">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
          </div>
          <div className="flex justify-between border-t border-black/10 pt-2 text-base font-bold dark:border-white/10">
            <p className="text-black dark:text-white">Total</p>
            <p className="text-black dark:text-white">${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutOrderSummary;
