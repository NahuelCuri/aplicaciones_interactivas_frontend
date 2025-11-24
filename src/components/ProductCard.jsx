import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../app/features/auth/authSlice";

const ProductCard = ({ id, name, finalPrice, categoryName, mainImage, sellerId }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  // Check if the current logged-in user is the seller of this product
  const isOwner = user && sellerId && user.id === sellerId;

  const imageSrc = mainImage ? mainImage : "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className={`bg-background-light dark:bg-background-dark/50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer ${
        isOwner ? "ring-2 ring-primary/50" : ""
      }`}
    >
      <div className="relative">
        <div
          className="w-full bg-center bg-no-repeat aspect-square bg-cover"
          style={{ backgroundImage: `url("${imageSrc}")` }}
        ></div>

        {/* --- OWNER BADGE --- */}
        {isOwner && (
          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
            Your Product
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          ${finalPrice.toFixed(2)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {categoryName}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;