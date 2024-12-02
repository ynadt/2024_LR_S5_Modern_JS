import { useState, useEffect } from 'react';
import Button from 'components/Button/Button.jsx';
import CardList from 'components/CardList/CardList.jsx';
import useFetchWithLogging from 'hooks/useFetchWithLogging.js';
import styles from './MenuSection.module.css';
import { INITIAL_VISIBLE_COUNT, LOAD_MORE_COUNT } from 'src/constants.js';
import { BASE_URL } from 'services/api.js';

const MenuSection = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

    const { data, error, isLoading } = useFetchWithLogging(`${BASE_URL}/meals`);

    useEffect(() => {
        if (data && data.length > 0) {
            const categories = [...new Set(data.map((item) => item.category))];
            setSelectedCategory(categories[0]);
        }
    }, [data]);

    if (error) {
        return <p>Error fetching meals: {error.message}</p>;
    }

    const categories = data ? [...new Set(data.map((item) => item.category))] : [];
    const filteredCards = selectedCategory ? data.filter((item) => item.category === selectedCategory) : data || [];
    const visibleCards = filteredCards.slice(0, visibleCount);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + LOAD_MORE_COUNT);
    };

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
