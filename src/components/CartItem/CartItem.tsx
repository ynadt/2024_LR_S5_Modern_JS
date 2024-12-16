import { ChangeEvent, FC } from 'react';
import Button from 'components/Button/Button.tsx';
import styles from './CartItem.module.css';

interface CartItemProps {
    product: {
        id: string;
        meal: string;
        price: number;
        img: string;
        instructions: string;
        quantity: number;
    };
    removeClickHandler: (id: string) => void;
    inputChangeHandler: (id: string, quantity: number) => void;
}

const CartItem: FC<CartItemProps> = ({ product, removeClickHandler, inputChangeHandler }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 0) {
            inputChangeHandler(product.id, value);
        }
    };

    return (
        <div className={styles.cartItem}>
            <img src={product.img} alt={product.meal} className={styles.cartItemImage} />
            <div className={styles.cartItemDetails}>
                <h3 className={styles.cartItemMeal}>{product.meal}</h3>
                <p className={styles.cartItemPrice}>${product.price.toFixed(2)}</p>
                <input type="number" value={product.quantity} min="0" className={styles.cartItemQuantity} onChange={handleInputChange} />
                <Button className={styles.cartItemRemoveButton} onClick={() => removeClickHandler(product.id)}>
                    x
                </Button>
            </div>
        </div>
    );
};

export default CartItem;
