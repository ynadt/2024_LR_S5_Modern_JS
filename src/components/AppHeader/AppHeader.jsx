import { useState } from 'react';
import styles from './AppHeader.module.css';
import logoIcon from 'src/assets/icons/logo-icon.svg';
import cartIcon from 'src/assets/icons/cart-icon.svg';

const AppHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Menu', href: '/' },
        { label: 'Company', href: '/' },
        { label: 'Login', href: '/' },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.appHeader}>
            <a href="/" className={styles.logoLink}>
                <img loading="lazy" src={logoIcon} alt="Logo" className={styles.logoIcon} />
            </a>
            <button onClick={toggleMenu} className={styles.burgerMenu}>
                ☰
            </button>
            <nav className={`${styles.navContainer} ${isMenuOpen ? styles.showMenu : ''}`}>
                <button onClick={toggleMenu} className={styles.closeMenuButton}>
                    ✖
                </button>
                <div className={styles.navLinks}>
                    {navItems.map((item) => (
                        <span key={item.label} className={styles.navItem}>
                            {item.label}
                        </span>
                    ))}
                </div>
                <div className={styles.cartIconContainer}>
                    <img loading="lazy" src={cartIcon} alt="Cart" className={styles.cartIcon} />
                    <span className={styles.cartCounter}>3</span>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
