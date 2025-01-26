import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from 'components/CartItem/CartItem';

describe('CartItem Component', () => {
    const product = {
        id: '1',
        meal: 'Pizza',
        price: 10.99,
        quantity: 2,
        instructions: 'Delicious pizza with cheese and toppings.',
        img: '/pizza.jpg',
    };

    it('renders the product details correctly', () => {
        render(<CartItem product={product} removeClickHandler={vi.fn()} inputChangeHandler={vi.fn()} />);

        expect(screen.getByText('Pizza')).toBeInTheDocument();
        expect(screen.getByText('$21.98')).toBeInTheDocument();
        expect(screen.getByAltText('Pizza')).toBeInTheDocument();
        const quantityInput = screen.getByDisplayValue('2');
        expect(quantityInput).toBeInTheDocument();
    });

    it('formats the price with 2 decimal places', () => {
        render(<CartItem product={product} removeClickHandler={vi.fn()} inputChangeHandler={vi.fn()} />);
        expect(screen.getByText('$21.98')).toBeInTheDocument();
    });

    it('calls removeClickHandler with correct ID when "x" button is clicked', () => {
        const mockRemoveClickHandler = vi.fn();
        render(<CartItem product={product} removeClickHandler={mockRemoveClickHandler} inputChangeHandler={vi.fn()} />);

        const removeButton = screen.getByText('x');
        fireEvent.click(removeButton);

        expect(mockRemoveClickHandler).toHaveBeenCalledWith('1');
    });

    it('updates total price and calls inputChangeHandler when quantity is changed', () => {
        const mockInputChangeHandler = vi.fn();
        render(<CartItem product={product} removeClickHandler={vi.fn()} inputChangeHandler={mockInputChangeHandler} />);

        const quantityInput = screen.getByDisplayValue('2');
        fireEvent.change(quantityInput, { target: { value: '3' } });

        expect(mockInputChangeHandler).toHaveBeenCalledWith('1', 3);
    });

    it('prevents updates for negative quantity values', () => {
        const mockInputChangeHandler = vi.fn();
        render(<CartItem product={product} removeClickHandler={vi.fn()} inputChangeHandler={mockInputChangeHandler} />);

        const quantityInput = screen.getByDisplayValue('2');
        fireEvent.change(quantityInput, { target: { value: '-1' } });

        expect(mockInputChangeHandler).not.toHaveBeenCalled();
    });

    it('does not call inputChangeHandler for non-numeric values', () => {
        const mockInputChangeHandler = vi.fn();
        render(<CartItem product={product} removeClickHandler={vi.fn()} inputChangeHandler={mockInputChangeHandler} />);

        const quantityInput = screen.getByDisplayValue('2');
        fireEvent.change(quantityInput, { target: { value: 'abc' } });

        expect(mockInputChangeHandler).not.toHaveBeenCalled();
    });

    it('handles decimal quantity values by parsing them as integers', () => {
        const mockInputChangeHandler = vi.fn();
        render(<CartItem product={product} removeClickHandler={vi.fn()} inputChangeHandler={mockInputChangeHandler} />);

        const quantityInput = screen.getByDisplayValue('2');
        fireEvent.change(quantityInput, { target: { value: '2.9' } });

        expect(mockInputChangeHandler).toHaveBeenCalledWith('1', 2);
    });

    it('displays $0.00 total price when quantity is zero', () => {
        const zeroQuantityProduct = { ...product, quantity: 0 };
        render(<CartItem product={zeroQuantityProduct} removeClickHandler={vi.fn()} inputChangeHandler={vi.fn()} />);

        expect(screen.getByText('$0.00')).toBeInTheDocument();
    });

    it('handles missing product image gracefully', () => {
        const productWithoutImage = { ...product, img: '' };
        render(<CartItem product={productWithoutImage} removeClickHandler={vi.fn()} inputChangeHandler={vi.fn()} />);

        expect(screen.getByAltText('Pizza')).toBeInTheDocument();
    });

    it('sets alt text properly for accessibility', () => {
        render(<CartItem product={product} removeClickHandler={vi.fn()} inputChangeHandler={vi.fn()} />);
        const imgElement = screen.getByAltText('Pizza');
        expect(imgElement).toHaveAttribute('alt', 'Pizza');
    });

    it('ensures input field has "min" attribute set to 0', () => {
        render(<CartItem product={product} removeClickHandler={vi.fn()} inputChangeHandler={vi.fn()} />);
        const quantityInput = screen.getByDisplayValue('2');
        expect(quantityInput).toHaveAttribute('min', '0');
    });
});
