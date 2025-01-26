import { describe, it, expect } from 'vitest';
import cartReducer, { addItemToCart, removeItemFromCart, changeItemQuantity, clearCart } from 'store/slices/cartSlice';

describe('cartSlice Reducer', () => {
    it('adds a new item to the cart', () => {
        const initialState = { items: [], totalQuantity: 0, totalPrice: 0 };
        const action = addItemToCart({
            id: '1',
            meal: 'Pizza',
            price: 10.99,
            quantity: 2,
            instructions: 'Delicious pizza with cheese and toppings.',
            img: '/pizza.jpg',
        });

        const state = cartReducer(initialState, action);

        expect(state.items).toHaveLength(1);
        expect(state.totalQuantity).toBe(2);
        expect(state.totalPrice).toBe(21.98);
    });

    it('updates an existing item when adding an item with the same ID', () => {
        const initialState = {
            items: [
                {
                    id: '1',
                    meal: 'Pizza',
                    price: 10.99,
                    quantity: 2,
                    instructions: 'Delicious pizza with cheese and toppings.',
                    img: '/pizza.jpg',
                },
            ],
            totalQuantity: 2,
            totalPrice: 21.98,
        };
        const action = addItemToCart({
            id: '1',
            meal: 'Pizza',
            price: 10.99,
            quantity: 1,
            instructions: 'Delicious pizza with cheese and toppings.',
            img: '/pizza.jpg',
        });

        const state = cartReducer(initialState, action);

        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantity).toBe(3);
        expect(state.totalQuantity).toBe(3);
        expect(state.totalPrice).toBe(32.97);
    });

    it('tries to remove a non-existent item and ensures no change in state', () => {
        const initialState = {
            items: [
                {
                    id: '1',
                    meal: 'Pizza',
                    price: 10.99,
                    quantity: 2,
                    instructions: 'Delicious pizza with cheese and toppings.',
                    img: '/pizza.jpg',
                },
            ],
            totalQuantity: 2,
            totalPrice: 21.98,
        };
        const action = removeItemFromCart('2');

        const state = cartReducer(initialState, action);

        expect(state.items).toHaveLength(1);
        expect(state.totalQuantity).toBe(2);
        expect(state.totalPrice).toBe(21.98);
    });

    it('handles quantity changes correctly', () => {
        const initialState = {
            items: [
                {
                    id: '1',
                    meal: 'Pizza',
                    price: 10.99,
                    quantity: 2,
                    instructions: 'Delicious pizza with cheese and toppings.',
                    img: '/pizza.jpg',
                },
            ],
            totalQuantity: 2,
            totalPrice: 21.98,
        };
        const action = changeItemQuantity({ id: '1', quantity: 3 });

        const state = cartReducer(initialState, action);

        expect(state.items[0].quantity).toBe(3);
        expect(state.totalQuantity).toBe(3);
        expect(state.totalPrice).toBe(32.97);
    });

    it('does not change state when changing quantity of a non-existent item', () => {
        const initialState = {
            items: [
                {
                    id: '1',
                    meal: 'Pizza',
                    price: 10.99,
                    quantity: 2,
                    instructions: 'Delicious pizza with cheese and toppings.',
                    img: '/pizza.jpg',
                },
            ],
            totalQuantity: 2,
            totalPrice: 21.98,
        };
        const action = changeItemQuantity({ id: '2', quantity: 3 });

        const state = cartReducer(initialState, action);

        expect(state.items).toHaveLength(1);
        expect(state.totalQuantity).toBe(2);
        expect(state.totalPrice).toBe(21.98);
    });

    it('does not allow negative quantities in changeItemQuantity', () => {
        const initialState = {
            items: [
                {
                    id: '1',
                    meal: 'Pizza',
                    price: 10.99,
                    quantity: 2,
                    instructions: 'Delicious pizza with cheese and toppings.',
                    img: '/pizza.jpg',
                },
            ],
            totalQuantity: 2,
            totalPrice: 21.98,
        };
        const action = changeItemQuantity({ id: '1', quantity: -1 });

        const state = cartReducer(initialState, action);

        expect(state.items[0].quantity).toBe(2);
        expect(state.totalQuantity).toBe(2);
        expect(state.totalPrice).toBe(21.98);
    });

    it('clears the cart', () => {
        const initialState = {
            items: [
                {
                    id: '1',
                    meal: 'Pizza',
                    price: 10.99,
                    quantity: 2,
                    instructions: 'Delicious pizza with cheese and toppings.',
                    img: '/pizza.jpg',
                },
            ],
            totalQuantity: 2,
            totalPrice: 21.98,
        };
        const action = clearCart();

        const state = cartReducer(initialState, action);

        expect(state.items).toHaveLength(0);
        expect(state.totalQuantity).toBe(0);
        expect(state.totalPrice).toBe(0);
    });

    it('handles empty cart when clearing', () => {
        const initialState = { items: [], totalQuantity: 0, totalPrice: 0 };
        const action = clearCart();

        const state = cartReducer(initialState, action);

        expect(state.items).toHaveLength(0);
        expect(state.totalQuantity).toBe(0);
        expect(state.totalPrice).toBe(0);
    });
});
