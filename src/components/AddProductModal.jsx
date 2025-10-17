import { useState, useEffect, useRef } from 'react';
import categoryService from '../services/categoryService';
import productService from '../services/productService';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const AddProductModal = ({ onClose, onProductCreate }) => {
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    categoryService.getAllCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    return () => {
      newImages.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [newImages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(prev => [...prev, ...files]);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
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

  const handleRemoveNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateProduct = () => {
    if (!formData.categoryId) {
      alert('Please select a category.');
      return;
    }

    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('description', formData.description);
    productData.append('price', formData.price);
    productData.append('stock', formData.stock);
    productData.append('discountPercentage', formData.discountPercentage || 0);
    productData.append('categoryId', formData.categoryId);

    newImages.forEach(image => {
      productData.append('images', image);
    });

    productService.createProduct(productData)
      .then(() => {
        onProductCreate();
        onClose();
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-4xl rounded-xl bg-card-light shadow-lg">
        <div className="p-8">
          <div className="flex justify-between items-start">
            <p className="text-text-primary text-2xl font-bold leading-tight tracking-[-0.033em]">Add Product</p>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="flex flex-col">
                  <p className="text-text-primary text-base font-medium leading-normal pb-2">Name</p>
                  <input name="name" value={formData.name || ''} onChange={handleChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-input-light h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" />
                </label>
              </div>
              <div>
                <label className="flex flex-col">
                  <p className="text-text-primary text-base font-medium leading-normal pb-2">Description</p>
                  <textarea name="description" value={formData.description || ''} onChange={handleChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-input-light min-h-36 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal"></textarea>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <p className="text-text-primary text-base font-medium leading-normal pb-2">Price</p>
                  <input name="price" value={formData.price || ''} onChange={handleChange} type="number" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-input-light h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" />
                </label>
                <label className="flex flex-col">
                  <p className="text-text-primary text-base font-medium leading-normal pb-2">Stock</p>
                  <input name="stock" value={formData.stock || ''} onChange={handleChange} type="number" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-input-light h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <p className="text-text-primary text-base font-medium leading-normal pb-2">Discount Percentage</p>
                  <input name="discountPercentage" value={formData.discountPercentage || ''} onChange={handleChange} type="number" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-input-light h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" />
                </label>
                <div className="flex flex-col">
                  <p className="text-text-primary text-base font-medium leading-normal pb-2">Category</p>
                  <div className="relative group">
                    <select name="categoryId" value={formData.categoryId || ''} onChange={handleChange} className="appearance-none w-full rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-input-light h-14 p-[15px] text-base font-normal leading-normal bg-none">
                      <option value="" disabled>Select a category</option>
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
              <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} useKeyboardArrows={true}>
                {newImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img alt={`New product image ${index}`} className="h-24 w-full object-cover rounded-lg" src={URL.createObjectURL(image)} />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <button onClick={() => handleRemoveNewImage(index)} className="text-white">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button onClick={onClose} className="px-6 py-3 rounded-lg text-text-primary bg-gray-100 hover:bg-gray-200 font-medium">Cancel</button>
            <button onClick={handleCreateProduct} className="px-6 py-3 rounded-lg text-white bg-primary hover:bg-primary/90 font-medium flex items-center gap-2">
              <span>Create Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
