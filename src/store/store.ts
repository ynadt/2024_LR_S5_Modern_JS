import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'store/slices/userSlice.ts';
import cartReducer from 'store/slices/cartSlice.ts';
import productsReducer from 'store/slices/productsSlice.ts';

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        products: productsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
