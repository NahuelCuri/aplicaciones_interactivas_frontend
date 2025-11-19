import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../app/features/categories/categorySlice";

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="mb-8 text-gray-600 dark:text-gray-300 text-sm">
        Loading categories...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="mb-8 text-red-500 text-sm italic">
        Error: {error}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="mb-8 text-gray-600 dark:text-gray-300 text-sm italic">
        No categories available
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* 🔍 Search input visible solo en mobile */}
      <div className="relative w-full md:hidden mb-4">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
          search
        </span>
        <input
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-200 dark:bg-background-dark/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search for products"
          type="search"
        />
      </div>

      {/* Categorías dinámicas */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
          Categories:
        </span>
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-background-dark/50 dark:text-gray-300 dark:hover:bg-background-dark/70"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-background-dark/50 dark:text-gray-300 dark:hover:bg-background-dark/70"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
