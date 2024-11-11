import { Component } from 'react';
import { CartContext } from 'contexts/CartContext.jsx';
import Button from 'components/Button/Button.jsx';
import styles from './Card.module.css';

class Card extends Component {
    static contextType = CartContext;

    handleAddToCart = () => {
        const { incrementCartCount } = this.context;
        incrementCartCount();
    };

    render() {
        const { item } = this.props;
        const { meal, price, instructions, img } = item;

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
                        <Button onClick={this.handleAddToCart}>Add to cart</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
