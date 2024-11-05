import styles from './Button.module.css';

const Button = ({ children, isActive = true, onClick }) => {
    return (
        <button className={`${styles.button} ${!isActive ? styles.inactive : ''}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
