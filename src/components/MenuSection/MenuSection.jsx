import styles from './MenuSection.module.css';

import CardList from 'components/CardList/CardList.jsx';
import Button from 'components/Button/Button.jsx';

const MenuSection = () => {
    const handleButtonClick = (category) => {
        console.log(`${category} button clicked`);
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
                <Button label="Dessert" onClick={() => handleButtonClick('Dessert')} />
                <Button label="Dinner" onClick={() => handleButtonClick('Dinner')} isActive={false} />
                <Button label="Breakfast" onClick={() => handleButtonClick('Breakfast')} isActive={false} />
            </div>
            <CardList />
            <Button label="See more" onClick={() => handleButtonClick('See more')} />
        </section>
    );
};

export default MenuSection;
