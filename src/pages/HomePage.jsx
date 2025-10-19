import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import productService from "../services/productService";
import Filter from "../components/Filter";

const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    name: '',
    category: null,
    priceRange: [0, 10000],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.getAllProducts();
        setAllProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let products = [...allProducts];

    // Filter by name
    if (filters.name) {
      products = products.filter(p => p.name.toLowerCase().includes(filters.name.toLowerCase()));
    }

    // Filter by category
    if (filters.category) {
      products = products.filter(p => p.categoryId === filters.category);
    }

    // Filter by price
    products = products.filter(p => p.finalPrice >= filters.priceRange[0] && p.finalPrice <= filters.priceRange[1]);

    setFilteredProducts(products);
    setCurrentPage(1); // Reset to first page after filtering
  }, [filters, allProducts]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // 🔹 calcular productos visibles según la página
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter
          activeCategory={filters.category}
          onCategoryChange={(categoryId) => handleFilterChange('category', categoryId)}
        />
        <Filter 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length > 0 ? (
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
