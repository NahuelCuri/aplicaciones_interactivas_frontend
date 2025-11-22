import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  fetchProductById,
  clearProductDetail,
} from "../app/features/products/productDetailSlice";
import { selectIsAuthenticated, selectIsBuyer } from "../app/features/auth/authSlice";
import { addItemToCart } from "../app/features/cart/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    detail: product,
    status,
    error,
  } = useSelector((state) => state.productDetail);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isBuyer = useSelector(selectIsBuyer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearProductDetail());
    };
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItemToCart({ productId: product.id, quantity: 1 }));
      console.log(`Added ${product.name} to cart`);
    }
  };

  if (status === "loading") {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <p className="text-center py-10">Loading product...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <p className="text-center py-10 text-red-500">
          Error loading product: {error}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <p className="text-center py-10">Product not found.</p>
      </div>
    );
  }

  const canAddToCart = isAuthenticated && isBuyer;

  const customStyles = `
    .carousel .thumbs-wrapper {
      margin: 20px 0;
    }

    .carousel .thumb {
      width: 60px !important;
      height: 60px !important;
      border-radius: 8px !important;
      overflow: hidden !important;
      border: 3px solid transparent !important;
      transition: border-color 0.2s;
    }

    .carousel .thumb.selected, .carousel .thumb:hover {
      border-color: #A0AEC0 !important;
    }

    .carousel .thumb img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
    }

    .carousel .control-arrow {
      background-color: #A0AEC0 !important;
      opacity: 0.8 !important;
      transition: opacity 0.2s;
    }

    .carousel .control-arrow:hover {
      opacity: 1 !important;
    }
  `;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <style>{customStyles}</style>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* IMAGES */}
          <div>
            <div className="mb-4">
              <nav aria-label="Breadcrumb" className="flex">
                <ol className="flex items-center space-x-2 text-sm" role="list">
                  <li>
                    <a className="text-gray-500 hover:text-primary" href="/">
                      Home
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="material-symbols-outlined text-gray-400 text-base">
                        chevron_right
                      </span>
                      <a
                        className="ml-2 text-gray-500 hover:text-primary"
                        href="#"
                      >
                        {product.categoryName}
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="material-symbols-outlined text-gray-400 text-base">
                        chevron_right
                      </span>
                      <span className="ml-2 text-gray-700 dark:text-gray-200">
                        {product.name}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            <Carousel
              showArrows={true}
              showThumbs={true}
              infiniteLoop={true}
              useKeyboardArrows={true}
              autoPlay={true}
            >
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <div key={index} onClick={() => openModal(image.content)}>
                    <img
                      src={`data:image/jpeg;base64,${image.content}`}
                      alt={`Product image ${index + 1}`}
                      className="h-96 w-full object-contain cursor-pointer"
                    />
                  </div>
                ))
              ) : (
                <div>
                  <img
                    src="https://via.placeholder.com/600x400?text=No+Image"
                    alt="No product image"
                  />
                </div>
              )}
            </Carousel>
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Sold by:{" "}
              <span className="font-semibold text-primary">
                {product.sellerUsername}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {product.description || "No description available."}
            </p>

            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary">
                  $
                  {product.finalPrice
                    ? product.finalPrice.toFixed(2)
                    : "0.00"}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-2xl font-medium text-gray-400 line-through">
                      ${product.price ? product.price.toFixed(2) : "0.00"}
                    </span>
                    <span className="text-sm font-bold text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-md">
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Stock available:{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {product.stock}
                </span>
              </p>
            </div>

            <button
              className={`w-full text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${
                canAddToCart
                  ? "bg-primary hover:bg-primary/90 cursor-pointer"
                  : "bg-primary/50 cursor-not-allowed"
              }`}
              disabled={product.stock === 0 || !canAddToCart}
              onClick={handleAddToCart}
            >
              <span className="material-symbols-outlined">
                add_shopping_cart
              </span>
              <span>
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </span>
            </button>
            {!canAddToCart && (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt.4">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:underline"
                >
                  Create one
                </Link>{" "}
                to start shopping!
              </p>
            )}
          </div>
        </div>
      </main>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`data:image/jpeg;base64,${selectedImage}`}
              alt="Enlarged product"
              className="w-full h-full object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 m-4 text-white text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
