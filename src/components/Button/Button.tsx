import styles from './Button.module.css';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Button = ({ children, className = '', ...props }: PropsWithChildren<ButtonProps>) => (
    <button className={`${styles.button} ${className}`} {...props}>
        {children}
    </button>
);

export default Button;
