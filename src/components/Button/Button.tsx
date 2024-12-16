import styles from './Button.module.css';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}

const Button: FC<ButtonProps> = ({ children, className = '', ...props }) => (
    <button className={`${styles.button} ${className}`} {...props}>
        {children}
    </button>
);

export default Button;
