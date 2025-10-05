const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // función para generar array de páginas [1, 2, ..., totalPages]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-12 flex justify-center items-center space-x-2">
      {/* botón prev */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 dark:text-gray-400 hover:bg-primary/10 dark:hover:bg-primary/20 disabled:opacity-50"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {/* números dinámicos */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
            page === currentPage
              ? "bg-primary text-white"
              : "text-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20"
          }`}
        >
          {page}
        </button>
      ))}

      {/* botón next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 dark:text-gray-400 hover:bg-primary/10 dark:hover:bg-primary/20 disabled:opacity-50"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
};

export default Pagination;
