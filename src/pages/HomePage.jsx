import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import { fetchProducts } from "../app/features/products/productsSlice";
import { setFilter } from "../app/features/filters/filterSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const filters = useSelector((state) => state.filters);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    // Only fetch products if the list is empty. This loads initial data 
    // efficiently and relies on Redux for all subsequent updates.
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [allProducts.length, dispatch]);

  const handleFilterChange = (filterName, value) => {
    dispatch(setFilter({ filterName, value }));
  };

  const filteredProducts = allProducts.filter((p) => {
    const byName =
      !filters.name ||
      p.name.toLowerCase().includes(filters.name.toLowerCase());
    const byCategory = filters.category === null || p.categoryId == filters.category;
    const byPrice =
      p.finalPrice >= filters.priceRange[0] &&
      p.finalPrice <= filters.priceRange[1];
    return byName && byCategory && byPrice;
  });

  // 🔹 calcular productos visibles según la página
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  let content;

  if (productStatus === "loading") {
    content = <p>Loading products...</p>;
  } else if (productStatus === "succeeded") {
    if (filteredProducts.length > 0) {
      content = (
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
      );
    } else {
      content = <p>No products found.</p>;
    }
  } else if (productStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter
          activeCategory={filters.category}
          onCategoryChange={(categoryId) =>
            handleFilterChange("category", categoryId)
          }
        />
        <Filter filters={filters} onFilterChange={handleFilterChange} />
        {content}
      </main>
    </div>
  );
};

export default HomePage;
