import { useContext } from 'react';
import { CartContext } from 'contexts/CartContext.jsx';
import Button from 'components/Button/Button.jsx';
import styles from './Card.module.css';

const Card = ({ item }) => {
    const { incrementCartCount } = useContext(CartContext);
    const { meal, price, img, instructions } = item;

    const addItemToCart = () => {
        incrementCartCount();
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={img} alt={meal} />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardName}>{meal}</div>
                    <div className={styles.cardPrice}>${price.toFixed(2)}</div>
                </div>
                <div className={styles.cardDescription}>{instructions}</div>
                <div className={styles.cardActions}>
                    <input type="number" defaultValue="1" readOnly className={styles.quantityInput} />
                    <Button onClick={addItemToCart}>Add to cart</Button>
                </div>
            </div>
        </div>
    );
};

export default Card;
