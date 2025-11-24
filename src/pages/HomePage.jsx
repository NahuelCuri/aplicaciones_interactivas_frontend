import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import SideFilter from "../components/SideFilter";
import { fetchProducts } from "../app/features/products/productsSlice";
import { setFilter } from "../app/features/filters/filterSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.list);
  const { entities: images } = useSelector((state) => state.images);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const filters = useSelector((state) => state.filters);

  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setFilterOpen] = useState(false);
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
    setCurrentPage(1);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product) => {
              const mainImage = product.imageIds && product.imageIds.length > 0 ? images[product.imageIds[0]] : null;
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  finalPrice={product.finalPrice}
                  categoryName={product.categoryName}
                  mainImage={mainImage}
                />
              )
            })}
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
      <div className="flex lg:flex-row">
        <SideFilter isOpen={isFilterOpen} onClose={() => setFilterOpen(false)} onFilterChange={handleFilterChange} />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-background-dark/50 dark:text-gray-300 dark:hover:bg-background-dark/70 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">filter_list</span>
                  <span>Filter</span>
                </button>
              </div>
            </div>
            {content}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
