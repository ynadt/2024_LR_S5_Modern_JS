import { Component } from 'react';
import Button from 'components/Button/Button.jsx';
import styles from './Card.module.css';

class Card extends Component {
    render() {
        const { name, price, description, image } = this.props;

        return (
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <img src={image} alt={name} />
                </div>
                <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardName}>{name}</div>
                        <div className={styles.cardPrice}>{price}</div>
                    </div>
                    <div className={styles.cardDescription}>{description}</div>
                    <div className={styles.cardActions}>
                        <input type="number" value="1" readOnly className={styles.quantityInput} />
                        <Button>Add to cart</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
