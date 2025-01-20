import React from 'react';
import { useTheme } from 'contexts/ThemeContext.tsx';
import MoonIcon from 'assets/icons/moon-icon.svg';
import SunIcon from 'assets/icons/sun-icon.svg';
import styles from './ThemeSelector.module.css';

const ThemeSelector: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(event.target.checked ? 'dark' : 'light');
    };

    return (
        <div className={styles.themeToggleContainer}>
            <input type="checkbox" className={styles.themeToggleCheckbox} id="theme-toggle" checked={theme === 'dark'} onChange={handleChange} />
            <label htmlFor="theme-toggle" className={styles.themeToggleCheckboxLabel}>
                <img src={MoonIcon} alt="Dark" />
                <img src={SunIcon} alt="Light" />
                <span className={styles.ball}></span>
            </label>
        </div>
    );
};

export default ThemeSelector;
