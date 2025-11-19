import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { CSSTransition } from 'react-transition-group';
import { fetchCategories } from '../app/features/categories/categorySlice';

const Filter = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { categories, status: categoriesStatus } = useSelector(state => state.categories);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  return (
    <div className="my-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-primary font-medium hover:underline flex items-center gap-2"
      >
        <span className="material-symbols-outlined">filter_list</span>
        Advanced filters
      </button>
      <CSSTransition
        in={isOpen}
        nodeRef={nodeRef}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <div ref={nodeRef} className="mt-4 p-6 border rounded-lg bg-gray-50 dark:bg-background-dark/50 shadow-md border-primary/50 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                value={filters.name}
                onChange={(e) => onFilterChange('name', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-200 dark:bg-background-dark/60 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Laptop"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                id="category"
                value={filters.category || ''}
                onChange={(e) => onFilterChange('category', e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3 py-2 rounded-lg bg-gray-200 dark:bg-background-dark/60 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range
              </label>
              <div className="px-2">
                <Slider
                  range
                  min={0}
                  max={10000}
                  value={filters.priceRange}
                  onChange={(value) => onFilterChange('priceRange', value)}
                  trackStyle={[{ backgroundColor: '#5949e9' }]}
                  handleStyle={[
                    { borderColor: '#5949e9', backgroundColor: 'white' },
                    { borderColor: '#5949e9', backgroundColor: 'white' },
                  ]}
                  railStyle={{ backgroundColor: '#e2e8f0' }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Filter;