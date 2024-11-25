import { Component } from 'react';
import Card from 'components/Card/Card.jsx';
import styles from './CardList.module.css';

class CardList extends Component {
    render() {
        const { cards = [] } = this.props;

        return (
            <div className={styles.cardList}>
                {cards.map((item) => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
        );
    }
}

export default CardList;
