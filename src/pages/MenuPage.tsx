import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { INITIAL_VISIBLE_COUNT, LOAD_MORE_COUNT } from 'data/constants.ts';
import { BASE_URL } from 'services/api.ts';
import { addItemToCart } from 'store/slices/cartSlice.ts';
import useFetchWithLogging from 'hooks/useFetchWithLogging.ts';
import Button from 'components/Button/Button.tsx';
import Card from 'components/Card/Card.tsx';
import styles from 'pages/MenuPage.module.css';

interface Meal {
    id: string;
    category: string;
    meal: string;
    price: number;
    img: string;
    instructions: string;
}

const MenuPage = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

    const { data: meals = [], error, isLoading } = useFetchWithLogging<Meal[] | null>(`${BASE_URL}/meals`);

    useEffect(() => {
        if (meals && meals.length > 0) {
            const categories = [...new Set(meals.map((item) => item.category))];
            setSelectedCategory(categories[0]);
        }
    }, [meals]);

    if (error) {
        return <p>Error fetching meals: {error.message}</p>;
    }

    const categories = meals ? [...new Set(meals.map((item) => item.category))] : [];
    const filteredCards = meals && selectedCategory ? meals.filter((item) => item.category === selectedCategory) : meals || [];
    const visibleCards = filteredCards.slice(0, visibleCount);

    const handleCategoryChange = (category: string) => {
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
                    <Button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={selectedCategory !== category ? styles.inactiveCategory : ''}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {isLoading ? (
                <p>Loading menu...</p>
            ) : visibleCards.length > 0 ? (
                <>
                    <div className={styles.cardList}>
                        {visibleCards.map((meal) => (
                            <Card
                                key={meal.id}
                                item={meal}
                                onAddToCart={(quantity) =>
                                    dispatch(
                                        addItemToCart({
                                            ...meal,
                                            quantity,
                                        })
                                    )
                                }
                            />
                        ))}
                    </div>
                    {visibleCards.length < filteredCards.length && <Button onClick={handleLoadMore}>See more</Button>}
                </>
            ) : (
                <p className={styles.noItemsMessage}>No items available.</p>
            )}
        </section>
    );
};

export default MenuPage;
