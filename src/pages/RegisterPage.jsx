import { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from 'components/AuthForm/AuthForm.jsx';
import Button from 'components/Button/Button.jsx';
import GoogleIcon from 'src/assets/icons/google-icon.svg';
import styles from 'pages/LoginPage.module.css';
import registerFields from 'data/RegisterPageData.js';

const RegisterPage = () => {
    const { registerWithEmail, loginWithGoogle, user } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleRegister = async (formData) => {
        const { email, password } = formData;
        setIsRegistering(true);
        setError(null);
        try {
            await registerWithEmail(email, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Register</h2>
                <AuthForm fields={registerFields} onSubmit={handleRegister} isSubmitting={isRegistering} submitButtonText="Register" />
                <p className={`${styles.globalErrorMessage} ${error ? styles.visible : ''}`}>{error}</p>
                <div className={styles.register}>
                    <span>Already have an account? </span>
                    <Link to="/login" className={styles.registerLink}>
                        Sign in
                    </Link>
                </div>
                <div className={styles.orSeparator}>
                    <div className={styles.line}></div>
                    <span className={styles.orText}>OR</span>
                    <div className={styles.line}></div>
                </div>
                <Button onClick={loginWithGoogle} disabled={isRegistering} className={styles.googleButton}>
                    <img src={GoogleIcon} alt="Google Icon" className={styles.googleIcon} />
                    Continue with Google
                </Button>
            </div>
        </section>
    );
};

export default RegisterPage;
