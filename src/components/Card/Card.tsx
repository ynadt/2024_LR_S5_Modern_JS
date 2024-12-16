import { ChangeEvent, FC, useState } from 'react';
import Button from 'components/Button/Button';
import styles from './Card.module.css';

interface CardProps {
    item: {
        id: string;
        meal: string;
        price: number;
        img: string;
        instructions: string;
        category: string;
    };
    onAddToCart: (quantity: number) => void;
}

const Card: FC<CardProps> = ({ item, onAddToCart }) => {
    const { meal, price, img, instructions } = item;

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            setQuantity(value);
        }
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
                    <input type="number" value={quantity} min="1" onChange={handleQuantityChange} className={styles.quantityInput} />
                    <Button onClick={() => onAddToCart(quantity)}>Add to cart</Button>
                </div>
            </div>
        </div>
    );
};

export default Card;
