import cardData from 'src/data/products.js';
import Card from 'src/components/Card/Card.jsx';
import styles from './CardList.module.css';

const CardList = () => {
    return (
        <div className={styles.cardList}>
            {cardData.map((item) => (
                <Card key={item.name} name={item.name} price={item.price} description={item.description} image={item.image} />
            ))}
        </div>
    );
};

export default CardList;
