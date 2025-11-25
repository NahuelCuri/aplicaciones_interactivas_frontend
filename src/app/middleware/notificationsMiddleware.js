import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { showSuccessToast, showErrorToast, showInfoToast } from '../../utils/notification.jsx';

import { updateProduct, createProduct, deleteProduct } from '../features/products/sellerProductsSlice';
import { createCategory, updateCategory, deleteCategory } from '../features/categories/categorySlice';
import { updateUser, deleteUser } from '../features/users/userSlice';
import { addItemToCart, removeItemFromCart, updateCartItemQuantity, checkoutCart } from '../features/cart/cartSlice';

export const notificationsListenerMiddleware = createListenerMiddleware();

const notificationMap = {
  [updateProduct.fulfilled.type]: { type: 'success', title: 'Product Updated', message: 'Your product has been saved successfully.' },
  [updateProduct.rejected.type]: { type: 'error', title: 'Update Failed', message: 'There was a problem saving your product.' },
  [createProduct.fulfilled.type]: { type: 'success', title: 'Product Created', message: 'Your new product is now live.' },
  [createProduct.rejected.type]: { type: 'error', title: 'Creation Failed', message: 'There was a problem creating your product.' },
  [deleteProduct.fulfilled.type]: { type: 'success', title: 'Product Deleted', message: 'The product has been removed.' },
  [deleteProduct.rejected.type]: { type: 'error', title: 'Deletion Failed', message: 'The product could not be removed.' },

  [createCategory.fulfilled.type]: { type: 'success', title: 'Category Created', message: 'The new category is now available.' },
  [createCategory.rejected.type]: { type: 'error', title: 'Creation Failed', message: 'The category could not be created.' },
  [updateCategory.fulfilled.type]: { type: 'success', title: 'Category Updated', message: 'The category has been successfully updated.' },
  [updateCategory.rejected.type]: { type: 'error', title: 'Update Failed', message: 'The category could not be updated.' },
  [deleteCategory.fulfilled.type]: { type: 'success', title: 'Category Deleted', message: 'The category has been removed.' },
  [deleteCategory.rejected.type]: { type: 'error', title: 'Deletion Failed', message: 'This category might be in use.' },

  [updateUser.fulfilled.type]: { type: 'success', title: 'User Updated', message: 'The user profile has been saved.' },
  [updateUser.rejected.type]: { type: 'error', title: 'Update Failed', message: 'Could not save user profile.' },
  [deleteUser.fulfilled.type]: { type: 'success', title: 'User Deleted', message: 'The user has been removed.' },
  [deleteUser.rejected.type]: { type: 'error', title: 'Deletion Failed', message: 'The user could not be removed.' },

  [addItemToCart.fulfilled.type]: { type: 'success', title: 'Item Added', message: 'Added to your cart.' },
  [addItemToCart.rejected.type]: { type: 'error', title: 'Error', message: 'Could not add item to cart.' },
  [removeItemFromCart.fulfilled.type]: { type: 'info', title: 'Item Removed', message: 'Removed from your cart.' },
  [removeItemFromCart.rejected.type]: { type: 'error', title: 'Error', message: 'Could not remove item from cart.' },
  [updateCartItemQuantity.fulfilled.type]: { type: 'info', title: 'Cart Updated', message: 'Item quantity has been updated.' },
  [updateCartItemQuantity.rejected.type]: { type: 'error', title: 'Error', message: 'Could not update item quantity.' },

  [checkoutCart.fulfilled.type]: { type: 'success', title: 'Order Placed!', message: 'Thank you for your purchase.' },
  [checkoutCart.rejected.type]: { type: 'error', title: 'Order Failed', message: 'There was a problem placing your order.' },
};

notificationsListenerMiddleware.startListening({
  matcher: isAnyOf(
    updateProduct.fulfilled, updateProduct.rejected,
    createProduct.fulfilled, createProduct.rejected,
    deleteProduct.fulfilled, deleteProduct.rejected,
    createCategory.fulfilled, createCategory.rejected,
    updateCategory.fulfilled, updateCategory.rejected,
    deleteCategory.fulfilled, deleteCategory.rejected,
    updateUser.fulfilled, updateUser.rejected,
    deleteUser.fulfilled, deleteUser.rejected,
    addItemToCart.fulfilled, addItemToCart.rejected,
    removeItemFromCart.fulfilled, removeItemFromCart.rejected,
    updateCartItemQuantity.fulfilled, updateCartItemQuantity.rejected,
    checkoutCart.fulfilled, checkoutCart.rejected
  ),
  effect: (action) => {
    const notification = notificationMap[action.type];
    if (notification) {
      const { type, title, message } = notification;
      switch (type) {
        case 'success':
          showSuccessToast(title, message);
          break;
        case 'error':
          showErrorToast(title, message);
          break;
        case 'info':
          showInfoToast(title, message);
          break;
        default:
          break;
      }
    }
  }
});