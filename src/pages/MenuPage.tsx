import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { INITIAL_VISIBLE_COUNT, LOAD_MORE_COUNT } from 'data/constants.ts';
import { addItemToCart } from 'store/slices/cartSlice.ts';
import { fetchProducts, Product } from 'store/slices/productsSlice.ts';
import { RootState, AppDispatch } from 'store/store.ts';
import Button from 'components/Button/Button.tsx';
import Card from 'components/Card/Card.tsx';
import { toast } from 'react-toastify';
import styles from 'pages/MenuPage.module.css';

const MenuPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: products, isLoading, error } = useSelector((state: RootState) => state.products);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    useEffect(() => {
        if (products.length > 0) {
            const categories = [...new Set(products.map((item) => item.category))];
            setSelectedCategory(categories[0]);
        }
    }, [products]);

    const categories = products.length > 0 ? [...new Set(products.map((item) => item.category))] : [];
    const filteredProducts = selectedCategory ? products.filter((product) => product.category === selectedCategory) : products;
    const visibleProducts = filteredProducts.slice(0, visibleCount);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + LOAD_MORE_COUNT);
    };

    const handleAddToCart = (product: Product, quantity: number) => {
        dispatch(
            addItemToCart({
                ...product,
                quantity,
            })
        );
        toast.success(`${product.meal} added to cart!`);
    };

    if (error) {
        return <p>Error fetching products: {error}</p>;
    }

    return (
        <section className={styles.section}>
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
            ) : visibleProducts.length > 0 ? (
                <>
                    <div className={styles.cardList}>
                        {visibleProducts.map((product) => (
                            <Card key={product.id} item={product} onAddToCart={(quantity) => handleAddToCart(product, quantity)} />
                        ))}
                    </div>
                    {visibleProducts.length < filteredProducts.length && <Button onClick={handleLoadMore}>See more</Button>}
                </>
            ) : (
                <p className={styles.noItemsMessage}>No items available.</p>
            )}
        </section>
    );
};

export default MenuPage;
