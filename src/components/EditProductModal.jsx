import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../app/features/products/sellerProductsSlice';
import { fetchCategories } from '../app/features/categories/categorySlice';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const EditProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const { categories, status: categoriesStatus } = useSelector(state => state.categories);
  const { entities: images } = useSelector(state => state.images); // Get normalized images
  const [formData, setFormData] = useState(product);
  const [newImages, setNewImages] = useState([]);
  const [imageIdsToDelete, setImageIdsToDelete] = useState([]); // Renamed for clarity
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
    setFormData(prev => {
      const updatedProduct = { ...product };
      if (product.categoryId) {
        updatedProduct.categoryId = product.categoryId;
      }
      return updatedProduct;
    });

    return () => {
      newImages.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [product, newImages, categoriesStatus, dispatch, categories]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(prev => [...prev, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setNewImages(prev => [...prev, ...files]);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveNewImage = (imageId) => {
    setNewImages(prev => prev.filter(file => URL.createObjectURL(file) !== imageId));
    setDisplayedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSaveChanges = async () => {
    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('description', formData.description);
    productData.append('price', formData.price);
    productData.append('stock', formData.stock);
    productData.append('discountPercentage', formData.discountPercentage || 0);
    productData.append('categoryId', formData.categoryId);

    newImages.forEach(image => {
      productData.append('newImages', image);
    });

    imageIdsToDelete.forEach(imageId => {
      productData.append('imagesToDelete', imageId);
    });

    try {
      await dispatch(updateProduct({ id: product.id, data: productData })).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  if (!product) return null;

  const [displayedImages, setDisplayedImages] = useState([]);

  useEffect(() => {
    if (product.imageIds && images) {
      const existingProductImageObjects = product.imageIds
        .filter(id => images[id]) // Filter out any imageIds that haven't been loaded yet
        .map(id => ({ id: id, content: images[id] })); // Create temporary objects for display
      setDisplayedImages([...existingProductImageObjects, ...newImages.map(file => ({
        id: URL.createObjectURL(file), // Use a URL as a temporary ID for new files
        content: URL.createObjectURL(file),
        file: file // Store the actual file object for FormData
      }))]);
    } else {
      setDisplayedImages(newImages.map(file => ({
        id: URL.createObjectURL(file),
        content: URL.createObjectURL(file),
        file: file
      })));
    }
    return () => {
      newImages.forEach(file => URL.revokeObjectURL(file.preview));
      displayedImages.forEach(img => {
        if (img.content.startsWith('blob:')) { // Revoke object URLs for temporary new images
          URL.revokeObjectURL(img.content);
        }
      });
    };
  }, [product.imageIds, images, newImages]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-4xl rounded-xl bg-card-light shadow-lg">
        <div className="p-8">
          <div className="flex justify-between items-start">
            <p className="text-text-primary text-2xl font-bold leading-tight tracking-[-0.033em]">Edit Product</p>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="flex flex-col">
                  <p className="text-text-primary text-base font-medium leading-normal pb-2">Name</p>
                  <input name="name" value={formData.name} onChange={handleChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-input-light h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" />
                </label>
              </div>
              <div>
                <label className="flex flex-col">
                  <p className="text-text-primary text-base font-medium leading-normal pb-2">Description</p>
                  <textarea name="description" value={formData.description} onChange={handleChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-input-light min-h-36 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal"></textarea>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <p className="text-text-primary text-base font-medium leading-normal pb-2">Price</p>
                  <input name="price" value={formData.price} onChange={handleChange} type="number" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-input-light h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" />
                </label>
                <label className="flex flex-col">
                  <p className="text-text-primary text-base font-medium leading-normal pb-2">Stock</p>
                  <input name="stock" value={formData.stock} onChange={handleChange} type="number" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-input-light h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <p className="text-text-primary text-base font-medium leading-normal pb-2">Discount Percentage</p>
                  <input name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} type="number" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-input-light h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" />
                </label>
                <div className="flex flex-col">
                  <p className="text-text-primary text-base font-medium leading-normal pb-2">Category</p>
                  <div className="relative group">
                    <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="appearance-none w-full rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-input-light h-14 p-[15px] text-base font-normal leading-normal bg-none">
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-text-primary text-base font-medium leading-normal pb-2">Images</p>
                <div 
                  onDragOver={handleDragOver} 
                  onDragLeave={handleDragLeave} 
                  onDrop={handleDrop} 
                  onClick={handleImageUploadClick}
                  className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-primary rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                    isDragOver ? 'bg-gray-200' : ''
                  }`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <span className="material-symbols-outlined text-4xl text-gray-400">cloud_upload</span>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input ref={fileInputRef} onChange={handleFileChange} className="hidden" id="dropzone-file" multiple type="file" />
                </div>
              </div>
              <Carousel key={displayedImages.length} showArrows={true} showThumbs={false} infiniteLoop={true} useKeyboardArrows={true}>
                {displayedImages.map((image, index) => {
                  return (
                    <div key={image.id || index} className="relative group">
                      <img alt={`Product image ${index}`} className="h-24 w-full object-cover rounded-lg" src={image.content} />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                        <button onClick={() => {
                           if (product.imageIds && product.imageIds.includes(image.id)) { // Existing image
                             setImageIdsToDelete(prev => [...prev, image.id]);
                             setDisplayedImages(prev => prev.filter(img => img.id !== image.id));
                           } else { // New image
                             handleRemoveNewImage(image.id);
                           }
                         }} className="text-white">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button onClick={onClose} className="px-6 py-3 rounded-lg text-text-primary bg-gray-100 hover:bg-gray-200 font-medium">Cancel</button>
            <button onClick={handleSaveChanges} className="px-6 py-3 rounded-lg text-white bg-primary hover:bg-primary/90 font-medium flex items-center gap-2">
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;