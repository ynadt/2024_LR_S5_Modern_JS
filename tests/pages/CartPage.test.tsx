import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from 'store/slices/cartSlice';
import CartPage from 'pages/CartPage';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const renderWithProviders = (preloadedState = {}) => {
    const store = configureStore({
        reducer: {
            cart: cartReducer,
        },
        preloadedState,
    });

    return {
        store,
        ...render(
            <Provider store={store}>
                <MemoryRouter>
                    <CartPage />
                </MemoryRouter>
            </Provider>
        ),
    };
};

describe('CartPage Component', () => {
    it('renders the cart with items', () => {
        renderWithProviders({
            cart: {
                items: [
                    { id: '1', meal: 'Pizza', price: 10.99, quantity: 2, img: '/pizza.jpg' },
                    { id: '2', meal: 'Burger', price: 8.99, quantity: 1, img: '/burger.jpg' },
                ],
                totalQuantity: 3,
                totalPrice: 30.97,
            },
        });

        expect(screen.getByText('Pizza')).toBeInTheDocument();
        expect(screen.getByText('Burger')).toBeInTheDocument();
        expect(screen.getByText('Total Items: 3')).toBeInTheDocument();
        expect(screen.getByText('Total Price: $30.97')).toBeInTheDocument();
    });

    it('renders an empty cart message when there are no items', () => {
        renderWithProviders({
            cart: {
                items: [],
                totalQuantity: 0,
                totalPrice: 0,
            },
        });

        expect(screen.getByText('Your shopping cart is currently empty')).toBeInTheDocument();
        expect(screen.getByText('Start Shopping')).toBeInTheDocument();
    });

    it('dispatches remove item action when the remove button is clicked', () => {
        const { store } = renderWithProviders({
            cart: {
                items: [{ id: '1', meal: 'Pizza', price: 10.99, quantity: 2, img: '/pizza.jpg' }],
                totalQuantity: 2,
                totalPrice: 21.98,
            },
        });

        const removeButton = screen.getByText('x');
        fireEvent.click(removeButton);

        const state = store.getState().cart;
        expect(state.items).toEqual([]);
    });

    it('dispatches change quantity action when quantity input is updated', () => {
        const { store } = renderWithProviders({
            cart: {
                items: [{ id: '1', meal: 'Pizza', price: 10.99, quantity: 2, img: '/pizza.jpg' }],
                totalQuantity: 2,
                totalPrice: 21.98,
            },
        });

        const quantityInput = screen.getByDisplayValue('2');
        fireEvent.change(quantityInput, { target: { value: '3' } });

        const state = store.getState().cart;
        expect(state.items[0].quantity).toBe(3);
    });

    it('dispatches clear cart action when the "Clear cart" button is clicked', () => {
        const { store } = renderWithProviders({
            cart: {
                items: [{ id: '1', meal: 'Pizza', price: 10.99, quantity: 2, img: '/pizza.jpg' }],
                totalQuantity: 2,
                totalPrice: 21.98,
            },
        });

        const clearCartButton = screen.getByText('Clear cart');
        fireEvent.click(clearCartButton);

        const state = store.getState().cart;
        expect(state.items).toEqual([]);
    });

    it('navigates to the menu page when "Start Shopping" is clicked', () => {
        renderWithProviders({
            cart: {
                items: [],
                totalQuantity: 0,
                totalPrice: 0,
            },
        });

        const startShoppingButton = screen.getByText('Start Shopping');
        fireEvent.click(startShoppingButton);

        expect(mockNavigate).toHaveBeenCalledWith('/menu');
    });

    it('renders "Clear cart" button only when there are items in the cart', () => {
        const { rerender } = renderWithProviders({
            cart: {
                items: [{ id: '1', meal: 'Pizza', price: 10.99, quantity: 1, img: '/pizza.jpg' }],
                totalQuantity: 1,
                totalPrice: 10.99,
            },
        });

        expect(screen.getByText('Clear cart')).toBeInTheDocument();

        rerender(
            <Provider
                store={configureStore({ reducer: { cart: cartReducer }, preloadedState: { cart: { items: [], totalQuantity: 0, totalPrice: 0 } } })}
            >
                <MemoryRouter>
                    <CartPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.queryByText('Clear cart')).not.toBeInTheDocument();
    });
});
