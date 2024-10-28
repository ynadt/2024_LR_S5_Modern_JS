import styles from './Button.module.css';

const Button = ({ label, isActive = true, onClick }) => {
    return (
        <button className={`${styles.button} ${!isActive ? styles.inactive : ''}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
