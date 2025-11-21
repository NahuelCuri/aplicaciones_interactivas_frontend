import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSellerProducts,
  searchSellerProducts,
  deleteProduct,
  fetchProductById,
  clearSelectedProduct,
} from '../app/features/products/productsSlice';
import Pagination from '../components/Pagination';
import EditProductModal from '../components/EditProductModal';
import ConfirmationModal from '../components/ConfirmationModal';
import AddProductModal from '../components/AddProductModal';

const SellerProductList = () => {
  const dispatch = useDispatch();
  const {
    sellerProducts,
    sellerStatus,
    selectedProduct,
    selectedProductStatus,
  } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const searchInputRef = useRef(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        dispatch(searchSellerProducts(searchTerm));
      } else {
        // Only fetch the full list if it has never been fetched before
        if (sellerStatus === 'idle') {
          dispatch(fetchSellerProducts());
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch, sellerStatus]);

  useEffect(() => {
    if (selectedProductStatus === 'succeeded') {
      setIsEditModalOpen(true);
    }
  }, [selectedProductStatus]);

  const handleOpenEditModal = (product) => {
    dispatch(fetchProductById(product.id));
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    dispatch(clearSelectedProduct());
  };

  const handleOpenConfirmModal = (product) => {
    setProductToDelete(product);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setProductToDelete(null);
    setIsConfirmModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(productToDelete.id));
    handleCloseConfirmModal();
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sellerProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(sellerProducts.length / productsPerPage);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-7xl mx-auto w-full">
          <div className="layout-content-container flex flex-col gap-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <p className="text-text-primary text-3xl md:text-4xl font-black tracking-tighter">My Products</p>
              <div className="relative flex items-center gap-4">
                <div className="relative w-full">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary border-gray-300 bg-gray-100 h-full placeholder:text-gray-500 pl-2 pr-10 text-sm font-normal"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button onClick={() => { setSearchTerm(''); searchInputRef.current.focus(); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  )}
                </div>
                <button onClick={handleOpenAddModal} className="flex items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white gap-2 text-base font-bold shadow-sm hover:bg-opacity-90 transition-colors whitespace-nowrap min-w-[160px] cursor-pointer">
                  <span className="material-symbols-outlined">add_circle</span>
                  <span>New Product</span>
                </button>
              </div>
            </div>
            {sellerStatus === 'loading' && <p>Loading...</p>}
            {sellerStatus === 'succeeded' && (
              <div className="flex flex-col gap-4">
                {currentProducts.map(product => (
                  <div key={product.id} className="flex flex-col sm:flex-row items-center gap-4 rounded-xl bg-surface p-4 border border-gray-200/80 hover:border-primary/50 transition-all shadow-sm hover:shadow-lg">
                    <div className="w-full sm:w-32 h-32 sm:h-24 sm:min-w-24 bg-center bg-no-repeat bg-cover rounded-lg" style={{ backgroundImage: `url(data:image/jpeg;base64,${product.mainImageBase64})` }}></div>
                    <div className="flex-1 flex flex-col sm:flex-row items-center justify-between w-full">
                      <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
                        <p className="text-text-primary text-lg font-bold">{product.name}</p>
                        <p className="text-primary text-lg font-bold">${product.finalPrice}</p>
                      </div>
                      <div className="flex gap-2 mt-4 sm:mt-0">
                        <button onClick={() => handleOpenEditModal(product)} className="flex-1 flex items-center justify-center h-10 px-4 rounded-md bg-gray-100 text-text-primary text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">Edit</button>
                        <button onClick={() => handleOpenConfirmModal(product)} className="flex-1 flex items-center justify-center h-10 px-4 rounded-md bg-red-500/10 text-red-500 text-sm font-medium hover:bg-red-500/20 transition-colors cursor-pointer">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {sellerStatus === 'failed' && <p>Failed to load products.</p>}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
      {isEditModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={handleCloseEditModal}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to delete "${productToDelete?.name}"?`}
          onConfirm={handleDeleteProduct}
          onCancel={handleCloseConfirmModal}
        />
      )}
      {isAddModalOpen && (
        <AddProductModal
          onClose={handleCloseAddModal}
        />
      )}
    </div>
  );
};

export default SellerProductList;
