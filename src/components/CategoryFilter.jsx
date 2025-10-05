import React, { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/categories") // 👈 Ajustá la URL según tu backend
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching categories");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mb-8 text-gray-600 dark:text-gray-300 text-sm">
        Loading categories...
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
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
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
