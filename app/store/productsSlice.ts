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
  error: string | null; // Added error field
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null, // Initialize error as null
};

// Fetch all products
export const fetchAllProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(apiUrls.products);
      console.log(response.data.items.reverse());
      
      return response.data.items.reverse();
    } catch (error:any) {
      // Log error to the console for debugging
      console.error('Error fetching products:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Add a new product
export const addProductAsync = createAsyncThunk<void, Product>(
  'products/addProductAsync',
  async (newProduct, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.post(apiUrls.reportProduct, newProduct);
      dispatch(fetchAllProducts());
    } catch (error:any) {
      // Log error to the console for debugging
      console.error('Error adding product:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Update an existing product
export const updateProductAsync = createAsyncThunk<void, { id: number; updatedProduct: Product }>(
  'products/updateProductAsync',
  async ({ id, updatedProduct }, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.put(`${apiUrls.products}/${id}`, updatedProduct);
      dispatch(fetchAllProducts());
    } catch (error:any) {
      // Log error to the console for debugging
      console.error('Error updating product:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Delete a product
export const deleteProductAsync = createAsyncThunk<void, number>(
  'products/deleteProductAsync',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${apiUrls.products}/${id}`);
      dispatch(fetchAllProducts());
    } catch (error:any) {
      // Log error to the console for debugging
      console.error('Error deleting product:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
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
        state.error = null; // Clear error on pending
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Set error message
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(addProductAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Set error message
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(updateProductAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Set error message
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(deleteProductAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Set error message
      });
  },
});

export default productsSlice.reducer;
