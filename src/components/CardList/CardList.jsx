import { Component } from 'react';
import Card from 'components/Card/Card.jsx';
import styles from './CardList.module.css';

class CardList extends Component {
    render() {
        const { cards = [] } = this.props;

        return (
            <div className={styles.cardList}>
                {cards.map((item) => (
                    <Card key={item.name} name={item.name} price={item.price} description={item.description} image={item.image} />
                ))}
            </div>
        );
    }
}

export default CardList;
