import { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import productService from "../services/productService";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 👈 cantidad de productos por página

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 calcular productos visibles según la página
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(products.length / pageSize);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter />
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  finalPrice={product.finalPrice}
                  categoryName={product.categoryName}
                  mainImageBase64={product.mainImageBase64}
                />
              ))}

            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <p>No products found.</p>
        )}
      </main>
    </div>
  );
};

export default HomePage;
