import { useState, useEffect } from 'react';
import Button from 'components/Button/Button.jsx';
import EyeIcon from 'src/assets/icons/eye-icon.svg';
import EyeClosedIcon from 'src/assets/icons/eye-closed-icon.svg';
import styles from 'components/AuthForm/AuthForm.module.css';

const AuthForm = ({ fields, onSubmit, isSubmitting, submitButtonText }) => {
    const [formState, setFormState] = useState(() =>
        fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {})
    );

    const [errors, setErrors] = useState(() => ({}));
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPasswordField, setShowPasswordField] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));

        const field = fields.find((f) => f.name === name);
        if (field?.validation && !field.validation(value, formState)) {
            setErrors((prev) => ({ ...prev, [name]: field.errorMessage }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    useEffect(() => {
        const validateForm = () => {
            const isValid = fields.every((field) => {
                const value = formState[field.name];
                return field.validation ? field.validation(value, formState) : true;
            });
            setIsFormValid(isValid);
        };

        validateForm();
    }, [formState, fields]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;

        fields.forEach((field) => {
            if (field.validation && !field.validation(formState[field.name], formState)) {
                newErrors[field.name] = field.errorMessage;
                isValid = false;
            }
        });

        setErrors(newErrors);
        if (isValid) onSubmit(formState);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {fields.map((field) => (
                <div key={field.name} className={styles.inputGroup}>
                    <label htmlFor={field.name} className={styles.label}>
                        {field.label}
                        {field.tooltip && (
                            <span className={styles.tooltip}>
                                <img src={field.tooltip.icon} alt="Tooltip" className={styles.clueIcon} />
                                <span className={styles.tooltipText}>{field.tooltip.text}</span>
                            </span>
                        )}
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            type={field.type === 'password' && showPasswordField ? 'text' : field.type}
                            name={field.name}
                            id={field.name}
                            value={formState[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            autoComplete={field.autoComplete}
                            className={`${styles.input} ${errors[field.name] ? styles.invalid : ''}`}
                        />
                        {field.type === 'password' && (
                            <img
                                src={showPasswordField ? EyeIcon : EyeClosedIcon}
                                alt="Toggle Password Visibility"
                                className={styles.eyeIcon}
                                onClick={() => setShowPasswordField((prev) => !prev)}
                            />
                        )}
                    </div>
                    <p className={`${styles.errorMessage} ${errors[field.name] ? styles.visible : ''}`}>{errors[field.name]}</p>
                </div>
            ))}
            <Button type="submit" disabled={!isFormValid || isSubmitting} className={styles.submitButton}>
                {isSubmitting ? 'Loading...' : submitButtonText}
            </Button>
        </form>
    );
};

export default AuthForm;
