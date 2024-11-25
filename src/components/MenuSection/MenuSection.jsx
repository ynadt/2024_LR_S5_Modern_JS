import { useState, useEffect } from 'react';
import Button from 'components/Button/Button.jsx';
import CardList from 'components/CardList/CardList.jsx';
import { fetchMeals } from 'services/api.js';
import styles from './MenuSection.module.css';
import { INITIAL_VISIBLE_COUNT, LOAD_MORE_COUNT } from 'src/constants.js';

const MenuSection = () => {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await fetchMeals();
                const uniqueCategories = [...new Set(fetchedData.map((item) => item.category))];
                setData(fetchedData);
                setCategories(uniqueCategories);
                setSelectedCategory(uniqueCategories[0] || null);
            } catch (error) {
                console.error('Failed to load meals:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + LOAD_MORE_COUNT);
    };

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
                    <Button key={category} onClick={() => handleCategoryChange(category)} isActive={selectedCategory === category}>
                        {category}
                    </Button>
                ))}
            </div>

            {isLoading ? (
                <p>Loading menu...</p>
            ) : visibleCards.length > 0 ? (
                <>
                    <CardList cards={visibleCards} />
                    {visibleCards.length < filteredCards.length && <Button onClick={handleLoadMore}>See more</Button>}
                </>
            ) : (
                <p className={styles.noItemsMessage}>No items available.</p>
            )}
        </section>
    );
};

export default MenuSection;
