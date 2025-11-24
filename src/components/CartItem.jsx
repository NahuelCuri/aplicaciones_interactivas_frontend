import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeItemFromCart, updateCartItemQuantity } from "../app/features/cart/cartSlice";

const CartItem = ({ item }) => {
  const { product, quantity, priceAtPurchase } = item;
  const dispatch = useDispatch();

  const isUnavailable = product.deleted || product.stock < quantity;

  const handleRemove = () => {
    dispatch(removeItemFromCart(product.id));
  };

  const handleIncrease = () => {
    if (isUnavailable) return;
    dispatch(updateCartItemQuantity({ productId: product.id, quantity: quantity + 1 }));
  };

  const handleDecrease = () => {
    if (isUnavailable) return;
    if (quantity > 1) {
      dispatch(updateCartItemQuantity({ productId: product.id, quantity: quantity - 1 }));
    } else {
      dispatch(removeItemFromCart(product.id));
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4 items-center">
      <div className="col-span-12 sm:col-span-6 flex items-center gap-4">
        <div
          className={`w-16 h-16 rounded bg-cover bg-center flex-shrink-0 ${isUnavailable ? 'opacity-50' : ''}`}
          style={{ backgroundImage: `url(data:image/jpeg;base64,${product.mainImageBase64})` }}
        ></div>
        <div className="flex flex-col items-start">
          {isUnavailable ? (
            <span className={`font-medium text-gray-900 dark:text-white ${isUnavailable ? 'opacity-50' : ''}`}>{product.name}</span>
          ) : (
            <Link to={`/product/${product.id}`} className="font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors">{product.name}</Link>
          )}
          {isUnavailable && <p className="text-xs text-red-500 mt-1">{product.deleted ? 'No longer available' : 'Out of stock'}</p>}
          <button onClick={handleRemove} className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 mt-1">Remove</button>
        </div>
      </div>
      <div className={`col-span-4 sm:col-span-2 text-center text-sm text-gray-600 dark:text-gray-300 ${isUnavailable ? 'opacity-50' : ''}`}>${priceAtPurchase.toFixed(2)}</div>
      <div className={`col-span-4 sm:col-span-2 flex justify-center items-center ${isUnavailable ? 'opacity-50' : ''}`}>
        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded">
          <button onClick={handleDecrease} disabled={isUnavailable} className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">-</button>
          <span className="px-3 py-1 text-sm">{quantity}</span>
          <button onClick={handleIncrease} disabled={isUnavailable} className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">+</button>
        </div>
      </div>
      <div className={`col-span-4 sm:col-span-2 text-right font-medium text-gray-900 dark:text-white ${isUnavailable ? 'opacity-50' : ''}`}>${(priceAtPurchase * quantity).toFixed(2)}</div>
    </div>
  );
};

export default CartItem;
