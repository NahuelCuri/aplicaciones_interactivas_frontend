import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../app/features/categories/categorySlice";
import AddCategoryModal from "../components/AddCategoryModal";
import EditCategoryModal from "../components/EditCategoryModal";
import DeleteCategoryConfirmationModal from "../components/DeleteCategoryConfirmationModal";

const CategoryAdminPage = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleCreateCategory = async (categoryData) => {
    dispatch(createCategory(categoryData));
    setIsAddModalOpen(false);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  const handleUpdateCategory = async (categoryId, categoryData) => {
    dispatch(updateCategory({ id: categoryId, data: categoryData }));
    handleCloseModals();
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    dispatch(deleteCategory(selectedCategory.id));
    handleCloseModals();
  };

  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Manage Categories
            </h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Create Category
            </button>
          </div>
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p className="text-red-500">Error: {error}</p>}
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                    scope="col"
                  >
                    Category Name
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                    scope="col"
                  >
                    Description
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                    scope="col"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-primary hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(category)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {isAddModalOpen && (
        <AddCategoryModal
          onClose={handleCloseModals}
          onSave={handleCreateCategory}
        />
      )}
      {isEditModalOpen && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={handleCloseModals}
          onSave={handleUpdateCategory}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteCategoryConfirmationModal
          onCancel={handleCloseModals}
          onConfirm={handleDeleteCategory}
        />
      )}
    </div>
  );
};

export default CategoryAdminPage;