// store/productsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInterceptor'; // Adjust path
import { apiUrls } from '../config/api.config'; // Adjust path

interface Product {
  id: number;
  name: string;
  // Other fields
}

interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
};

// Fetch all products
export const fetchAllProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async () => {
    const response = await axiosInstance.get(apiUrls.products);
    return response.data.reverse();
  }
);

// Add a new product
export const addProductAsync = createAsyncThunk<void, Product>(
  'products/addProductAsync',
  async (newProduct, { dispatch }) => {
    await axiosInstance.post(apiUrls.products, newProduct);
    dispatch(fetchAllProducts());
  }
);

// Update an existing product
export const updateProductAsync = createAsyncThunk<void, { id: number; updatedProduct: Product }>(
  'products/updateProductAsync',
  async ({ id, updatedProduct }, { dispatch }) => {
    await axiosInstance.put(`${apiUrls.products}/${id}`, updatedProduct);
    dispatch(fetchAllProducts());
  }
);

// Delete a product
export const deleteProductAsync = createAsyncThunk<void, number>(
  'products/deleteProductAsync',
  async (id, { dispatch }) => {
    await axiosInstance.delete(`${apiUrls.products}/${id}`);
    dispatch(fetchAllProducts());
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addProductAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateProductAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteProductAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productsSlice.reducer;
