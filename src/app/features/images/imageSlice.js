import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productImageService from '../../../services/productImageService';
import { deleteProduct } from '../products/sellerProductsSlice';

const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};

export const fetchImageById = createAsyncThunk(
  'images/fetchById',
  async (imageId, { getState }) => {
    const { images } = getState();
    if (images.entities[imageId]) {
      return;
    }
    const response = await productImageService.getImageById(imageId);
    const base64 = await blobToBase64(response.data);
    return { id: imageId, data: base64 };
  }
);

export const fetchImagesByProductId = createAsyncThunk(
    'images/fetchByProductId',
    async (productId, { getState }) => {
        const response = await productImageService.getImagesByProduct(productId);
        const images = response.data.map(async (image) => {
            const imageResponse = await productImageService.getImageById(image.id);
            const base64 = await blobToBase64(imageResponse.data);
            return { id: image.id, data: base64 };
        });
        return Promise.all(images);
    }
);

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    entities: {},
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImageById.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchImageById.fulfilled, (state, action) => {
        if (action.payload) {
          state.entities[action.payload.id] = action.payload.data;
        }
        state.loading = 'idle';
      })
      .addCase(fetchImageById.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
      .addCase(fetchImagesByProductId.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchImagesByProductId.fulfilled, (state, action) => {
        if (action.payload) {
          action.payload.forEach((image) => {
            state.entities[image.id] = image.data;
          });
        }
        state.loading = 'idle';
      })
      .addCase(fetchImagesByProductId.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { imageIds } = action.payload; 
        
        if (imageIds && imageIds.length > 0) {
          imageIds.forEach((id) => {

            delete state.entities[id];
          });
        }
      });
  },
});

export default imagesSlice.reducer;
