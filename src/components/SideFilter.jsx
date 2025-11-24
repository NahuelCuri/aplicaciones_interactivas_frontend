import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../app/features/categories/categorySlice";

const SideFilter = ({ isOpen, onClose, onFilterChange }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Mobile Filter */}
      <aside
        className={`transform top-0 right-0 w-72 bg-background-light dark:bg-background-dark p-6 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-40 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <FilterContent onFilterChange={onFilterChange} />
        </div>
      </aside>

      {/* Desktop Filter */}
      <aside className="hidden lg:block w-full lg:w-72 flex-shrink-0">
        <div className="lg:sticky lg:top-24 space-y-6">
          <FilterContent onFilterChange={onFilterChange} />
        </div>
      </aside>
    </>
  );
};

const FilterContent = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handlePriceChange = (index, value) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = value === '' ? (index === 0 ? 0 : 10000) : parseInt(value, 10);
    onFilterChange("priceRange", newPriceRange);
  };

  return (
    <>
      <div className="bg-background-light dark:bg-background-dark/50 p-6 rounded-xl shadow-sm">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Search
        </h3>
        <input
          className="w-full px-3 py-2 text-sm rounded-lg bg-gray-200 dark:bg-background-dark/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary border-transparent"
          placeholder="Product name..."
          type="text"
          value={filters.name}
          onChange={(e) => onFilterChange("name", e.target.value)}
        />
      </div>
      <div className="bg-background-light dark:bg-background-dark/50 p-6 rounded-xl shadow-sm">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Categories
        </h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onFilterChange("category", null)}
              className={`text-sm hover:underline cursor-pointer ${
                filters.category === null
                  ? "text-primary font-medium"
                  : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              }`}
            >
              All
            </button>
          </li>
          {categories && categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onFilterChange("category", category.id)}
                className={`text-sm hover:underline cursor-pointer ${
                  filters.category === category.id
                    ? "text-primary font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-background-light dark:bg-background-dark/50 p-6 rounded-xl shadow-sm">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            className="w-full px-3 py-2 text-sm rounded-lg bg-gray-200 dark:bg-background-dark/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary border-transparent"
            placeholder="Min"
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange(0, e.target.value)}
          />
          <span className="text-gray-500">-</span>
          <input
            className="w-full px-3 py-2 text-sm rounded-lg bg-gray-200 dark:bg-background-dark/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary border-transparent"
            placeholder="Max"
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(1, e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default SideFilter;
