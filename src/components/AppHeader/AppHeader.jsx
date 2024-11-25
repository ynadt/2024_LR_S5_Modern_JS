import { Component } from 'react';
import { navItems } from 'data/headerData.js';
import { CartContext } from 'contexts/CartContext.jsx';
import styles from './AppHeader.module.css';
import logoIcon from 'assets/icons/logo-icon.svg';
import cartIcon from 'assets/icons/cart-icon.svg';
import burgerMenuIcon from 'assets/icons/burger-menu-icon.svg';
import closeMenuIcon from 'assets/icons/close-menu-icon.svg';

class AppHeader extends Component {
    static contextType = CartContext;

    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
        };
    }

    toggleMenu = () => {
        this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }));
    };

    render() {
        const { isMenuOpen } = this.state;
        const { cartCount } = this.context;

        return (
            <header className={styles.appHeader}>
                <a href="/" className={styles.logoLink}>
                    <img loading="lazy" src={logoIcon} alt="Logo" className={styles.logoIcon} />
                </a>
                <button onClick={this.toggleMenu} className={styles.burgerMenu} aria-label="Toggle Menu">
                    <img loading="lazy" src={burgerMenuIcon} alt="Open Menu" className={styles.icon} />
                </button>
                <nav className={`${styles.navContainer} ${isMenuOpen ? styles.showMenu : ''}`}>
                    <button onClick={this.toggleMenu} className={styles.closeMenuButton} aria-label="Close Menu">
                        <img loading="lazy" src={closeMenuIcon} alt="Close Menu" className={styles.icon} />
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
                        <span className={styles.cartCounter}>{cartCount}</span>
                    </div>
                </nav>
            </header>
        );
    }
}

export default AppHeader;
