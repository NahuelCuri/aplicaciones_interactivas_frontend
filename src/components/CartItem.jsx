import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeItemFromCart, updateCartItemQuantity } from "../app/features/cart/cartSlice";

const CartItem = ({ item }) => {
  const { product, quantity, priceAtPurchase } = item;
  const dispatch = useDispatch();

  const isDeleted = product.deleted;

  const handleRemove = () => {
    dispatch(removeItemFromCart(product.id));
  };

  const handleIncrease = () => {
    if (isDeleted) return;
    dispatch(updateCartItemQuantity({ productId: product.id, quantity: quantity + 1 }));
  };

  const handleDecrease = () => {
    if (isDeleted) return;
    if (quantity > 1) {
      dispatch(updateCartItemQuantity({ productId: product.id, quantity: quantity - 1 }));
    } else {
      dispatch(removeItemFromCart(product.id));
    }
  };

  return (
    <div className="relative">
      <div className={`grid grid-cols-12 gap-4 p-4 items-center ${isDeleted ? 'opacity-50 grayscale' : ''}`}>
        <div className="col-span-12 sm:col-span-6 flex items-center gap-4">
          <div
            className="w-16 h-16 rounded bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url(data:image/jpeg;base64,${product.mainImageBase64})` }}
          ></div>
          <div>
            <Link to={`/product/${product.id}`} className={`font-medium text-gray-900 dark:text-white ${!isDeleted && 'hover:text-primary dark:hover:text-primary transition-colors'}`}>{product.name}</Link>
            <button onClick={handleRemove} className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 mt-1">Remove</button>
          </div>
        </div>
        <div className="col-span-4 sm:col-span-2 text-center text-sm text-gray-600 dark:text-gray-300">${priceAtPurchase.toFixed(2)}</div>
        <div className="col-span-4 sm:col-span-2 flex justify-center items-center">
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded">
            <button onClick={handleDecrease} disabled={isDeleted} className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">-</button>
            <span className="px-3 py-1 text-sm">{quantity}</span>
            <button onClick={handleIncrease} disabled={isDeleted} className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">+</button>
          </div>
        </div>
        <div className="col-span-4 sm:col-span-2 text-right font-medium text-gray-900 dark:text-white">${(priceAtPurchase * quantity).toFixed(2)}</div>
      </div>
      {isDeleted && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 rounded-lg">
          <span className="text-red-700 dark:text-red-500 font-bold bg-red-100 dark:bg-red-900/50 px-4 py-2 rounded">
            No longer available
          </span>
        </div>
      )}
    </div>
  );
};

export default CartItem;
