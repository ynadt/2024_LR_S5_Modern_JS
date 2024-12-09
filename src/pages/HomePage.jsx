import Button from 'components/Button/Button.jsx';
import foodImage from 'src/assets/backgrounds/home_bg.png';
import trustpilotIcon from 'src/assets/icons/trustpilot-icon.svg';
import styles from 'pages/HomePage.module.css';

const HomePage = () => {
    return (
        <section className={styles.section}>
            <div className={styles.contentWrapper}>
                <div className={styles.textContent}>
                    <h1 className={styles.heading}>
                        <span className={styles.highlight}>
                            Beautiful food &amp; takeaway, <span className={styles.accent}>delivered</span> to your door.
                        </span>
                    </h1>
                    <p className={styles.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard
                        dummy text ever since the 1500.
                    </p>
                    <div className={styles.buttonContainer}>
                        <Button onClick={() => console.log('Order Placed!')}>Place an Order</Button>
                    </div>
                    <div className={styles.reviewSection}>
                        <img src={trustpilotIcon} alt="Trustpilot Logo" className={styles.trustpilotLogo} />
                        <div className={styles.reviewDetails}>
                            <span className={styles.rating}>4.8 out of 5</span> based on 2000+ reviews
                        </div>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <img src={foodImage} alt="Food and Takeaway" className={styles.heroImage} />
                </div>
            </div>
        </section>
    );
};

export default HomePage;
