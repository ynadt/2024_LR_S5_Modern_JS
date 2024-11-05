import { Component } from 'react';
import Button from 'components/Button/Button.jsx';
import CardList from 'components/CardList/CardList.jsx';
import cardData from 'data/products.js';
import styles from './MenuSection.module.css';

class MenuSection extends Component {
    constructor(props) {
        super(props);

        const categories = cardData.length ? [...new Set(cardData.map((item) => item.category))] : [];

        this.state = {
            selectedCategory: categories[0] || null,
            categories,
        };
    }

    selectCategory = (category) => {
        this.setState({ selectedCategory: category });
    };

    render() {
        const { selectedCategory, categories } = this.state;
        const filteredCards = selectedCategory ? cardData.filter((item) => item.category === selectedCategory) : [];

        return (
            <section className={styles.menuSection}>
                <h1 className={styles.title}>Browse our menu</h1>
                <p className={styles.description}>
                    <span>Use our menu to place an order online, or </span>
                    <a href="tel:+12345678901" className={styles.phoneTooltip}>
                        phone
                        <span className={styles.tooltipText}>+1 (234) 567-8901</span>
                    </a>
                    <span> our store to place a pickup order. Fast and fresh food.</span>
                </p>
                <div className={styles.buttonRow}>
                    {categories.map((category) => (
                        <Button key={category} onClick={() => this.selectCategory(category)} isActive={selectedCategory === category}>
                            {category}
                        </Button>
                    ))}
                </div>
                {filteredCards.length > 0 ? <CardList cards={filteredCards} /> : <p className={styles.noItemsMessage}>No items available.</p>}
                <Button>See more</Button>
            </section>
        );
    }
}

export default MenuSection;
