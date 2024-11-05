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
            visibleCount: 6,
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
        this.setState({ selectedCategory: category, visibleCount: 6 });
    };

    loadMore = () => {
        this.setState((prevState) => ({
            visibleCount: prevState.visibleCount + 6,
        }));
    };

    render() {
        const { data, selectedCategory, categories, isLoading, visibleCount } = this.state;
        const filteredCards = selectedCategory ? data.filter((item) => item.category === selectedCategory) : [];
        const visibleCards = filteredCards.slice(0, visibleCount);

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
                ) : visibleCards.length > 0 ? (
                    <>
                        <CardList cards={visibleCards} />
                        {visibleCards.length < filteredCards.length && <Button onClick={this.loadMore}>See more</Button>}
                    </>
                ) : (
                    <p className={styles.noItemsMessage}>No items available.</p>
                )}
            </section>
        );
    }
}

export default MenuSection;
