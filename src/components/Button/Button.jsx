import { Component } from 'react';
import styles from './Button.module.css';

class Button extends Component {
    render() {
        const { children, isActive = true, onClick } = this.props;
        return (
            <button className={`${styles.button} ${!isActive ? styles.inactive : ''}`} onClick={onClick}>
                {children}
            </button>
        );
    }
}

export default Button;
