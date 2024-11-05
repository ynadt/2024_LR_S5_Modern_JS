import { Component } from 'react';
import Button from 'components/Button/Button.jsx';
import CardList from 'components/CardList/CardList.jsx';
import { fetchMeals } from 'services/api.js';
import styles from './MenuSection.module.css';

class MenuSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selectedCategory: null,
            categories: [],
            isLoading: true,
        };
    }

    async componentDidMount() {
        try {
            const data = await fetchMeals();
            const categories = this.getCategories(data);

            this.setState({
                data,
                categories,
                selectedCategory: categories[0] || null,
                isLoading: false,
            });
        } catch (error) {
            console.error('Failed to load meals:', error);
            this.setState({ isLoading: false });
        }
    }

    getCategories = (data) => {
        return [...new Set(data.map((item) => item.category))];
    };

    selectCategory = (category) => {
        this.setState({ selectedCategory: category });
    };

    render() {
        const { data, selectedCategory, categories, isLoading } = this.state;
        const filteredCards = selectedCategory ? data.filter((item) => item.category === selectedCategory) : [];

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

                {isLoading ? (
                    <p>Loading menu...</p>
                ) : filteredCards.length > 0 ? (
                    <CardList cards={filteredCards} />
                ) : (
                    <p className={styles.noItemsMessage}>No items available.</p>
                )}

                {filteredCards.length > 0 && <Button>See more</Button>}
            </section>
        );
    }
}

export default MenuSection;
