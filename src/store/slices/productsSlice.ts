import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from 'services/api';
import { CartItem } from 'types/types';

export interface Product extends Omit<CartItem, 'quantity'> {
    category: string;
}

interface ProductsState {
    items: Product[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    isLoading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>('products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/meals`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch products';
            });
    },
});

export default productsSlice.reducer;
