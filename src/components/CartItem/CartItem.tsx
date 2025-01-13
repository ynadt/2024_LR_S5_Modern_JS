import { ChangeEvent, FC, useState } from 'react';
import Button from 'components/Button/Button.tsx';
import { CartItem as CartItemType } from 'types/types.ts';
import styles from './CartItem.module.css';

interface CartItemProps {
    product: CartItemType;
    removeClickHandler: (id: string) => void;
    inputChangeHandler: (id: string, quantity: number) => void;
}

const CartItem: FC<CartItemProps> = ({ product, removeClickHandler, inputChangeHandler }) => {
    const [totalPrice, setTotalPrice] = useState(product.price * product.quantity);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 0) {
            setTotalPrice(product.price * value);
            inputChangeHandler(product.id, value);
        }
    };

    return (
        <div className={styles.cartItem}>
            <div className={styles.cartItemImgContainer}>
                <img src={product.img} alt={product.meal} className={styles.cartItemImage} />
                <h3 className={styles.cartItemName}>{product.meal}</h3>
            </div>
            <div className={styles.cartItemDetails}>
                <p className={styles.cartItemPrice}>${totalPrice.toFixed(2)}</p>
                <input type="number" value={product.quantity} min="0" className={styles.cartItemQuantity} onChange={handleInputChange} />
                <Button className={styles.cartItemRemoveButton} onClick={() => removeClickHandler(product.id)}>
                    x
                </Button>
            </div>
        </div>
    );
};

export default CartItem;
