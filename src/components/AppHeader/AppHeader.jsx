import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { navItems } from 'data/headerData.js';
import { useAuth } from 'contexts/AuthContext';
import { CartContext } from 'contexts/CartContext.jsx';
import styles from './AppHeader.module.css';
import logoIcon from 'assets/icons/logo-icon.svg';
import cartIcon from 'assets/icons/cart-icon.svg';
import burgerMenuIcon from 'assets/icons/burger-menu-icon.svg';
import closeMenuIcon from 'assets/icons/close-menu-icon.svg';

const AppHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useContext(CartContext);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <header className={styles.appHeader}>
            <NavLink to="/" className={styles.logoLink}>
                <img loading="lazy" src={logoIcon} alt="Logo" className={styles.logoIcon} />
            </NavLink>
            <button onClick={toggleMenu} className={styles.burgerMenu} aria-label="Toggle Menu">
                <img loading="lazy" src={burgerMenuIcon} alt="Open Menu" className={styles.icon} />
            </button>
            <nav className={`${styles.navContainer} ${isMenuOpen ? styles.showMenu : ''}`}>
                <button onClick={toggleMenu} className={styles.closeMenuButton} aria-label="Close Menu">
                    <img loading="lazy" src={closeMenuIcon} alt="Close Menu" className={styles.icon} />
                </button>
                <div className={styles.navLinks}>
                    {navItems
                        .filter((item) => {
                            if (user && (item.label === 'Login' || item.label === 'Register')) return false;
                            return !(!user && item.label === 'Logout');
                        })
                        .map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.href}
                                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
                                onClick={item.label === 'Logout' ? handleLogout : () => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                </div>
                <div className={styles.cartIconContainer}>
                    <NavLink to="/cart">
                        <img loading="lazy" src={cartIcon} alt="Cart" className={styles.cartIcon} />
                        <span className={styles.cartCounter}>{cartCount}</span>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
