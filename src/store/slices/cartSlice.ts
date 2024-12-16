import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logout } from 'store/slices/userSlice';

interface CartItem {
    id: string;
    meal: string;
    price: number;
    img: string;
    category: string;
    instructions: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            state.totalQuantity += action.payload.quantity;
            state.totalPrice += action.payload.price * action.payload.quantity;
        },
        removeItemFromCart(state, action: PayloadAction<string>) {
            const existingItemIndex = state.items.findIndex((item) => item.id === action.payload);
            if (existingItemIndex !== -1) {
                const existingItem = state.items[existingItemIndex];
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;
                state.items.splice(existingItemIndex, 1);
            }
        },
        changeItemQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem && quantity > 0) {
                const quantityDifference = quantity - existingItem.quantity;
                existingItem.quantity = quantity;
                state.totalQuantity += quantityDifference;
                state.totalPrice += quantityDifference * existingItem.price;
            } else if (existingItem && quantity === 0) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter((item) => item.id !== id);
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        });
    },
});

export const { addItemToCart, removeItemFromCart, changeItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
