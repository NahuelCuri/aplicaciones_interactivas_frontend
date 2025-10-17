import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import productService from "../services/productService";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Header from "./Header";
import { useAuth } from "../services/AuthContext";
import { useCart } from "./CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { isAuthenticated, isBuyer } = useAuth();
  const { addItemToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItemToCart(product.id, 1);
      console.log(`Added ${product.name} to cart`);
    }
  };

  if (error) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <Header />
        <p className="text-center py-10 text-red-500">Error loading product.</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <Header />
        <p className="text-center py-10">Loading product...</p>
      </div>
    );
  }

  const canAddToCart = isAuthenticated && isBuyer;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* IMAGES */}
          <div>
            <div className="mb-4">
              <nav aria-label="Breadcrumb" className="flex">
                <ol className="flex items-center space-x-2 text-sm" role="list">
                  <li>
                    <a className="text-gray-500 hover:text-primary" href="/">Home</a>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="material-symbols-outlined text-gray-400 text-base">chevron_right</span>
                      <a className="ml-2 text-gray-500 hover:text-primary" href="#">
                        {product.categoryName}
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="material-symbols-outlined text-gray-400 text-base">chevron_right</span>
                      <span className="ml-2 text-gray-700 dark:text-gray-200">{product.name}</span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            <Carousel showArrows={true} showThumbs={true} infiniteLoop={true} useKeyboardArrows={true} autoPlay={true}>
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <div key={index}>
                    <img src={`data:image/jpeg;base64,${image.content}`} alt={`Product image ${index + 1}`} />
                  </div>
                ))
              ) : (
                <div>
                  <img src="https://via.placeholder.com/600x400?text=No+Image" alt="No product image" />
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
              Sold by: <span className="font-semibold text-primary">{product.sellerUsername}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {product.description || "No description available."}
            </p>

            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary">
                  ${product.finalPrice ? product.finalPrice.toFixed(2) : '0.00'}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-2xl font-medium text-gray-400 line-through">
                      ${product.price ? product.price.toFixed(2) : '0.00'}
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
                Stock available: <span className="font-bold text-gray-900 dark:text-white">{product.stock}</span>
              </p>
            </div>

            <button 
              className={`w-full text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${
                canAddToCart ? 'bg-primary hover:bg-primary/90 cursor-pointer' : 'bg-primary/50 cursor-not-allowed'
              }`}
              disabled={product.stock === 0 || !canAddToCart}
              onClick={handleAddToCart}
            >
              <span className="material-symbols-outlined">add_shopping_cart</span>
              <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
            {!canAddToCart && (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                Don't have an account? <Link to="/register" className="text-primary hover:underline">Create one</Link> to start shopping!
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;