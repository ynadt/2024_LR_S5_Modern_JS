import { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from 'components/AuthForm/AuthForm.jsx';
import Button from 'components/Button/Button.jsx';
import GoogleIcon from 'src/assets/icons/google-icon.svg';
import styles from 'pages/LoginPage.module.css';
import loginFields from 'data/LoginPageData.js';

const LoginPage = () => {
    const { loginWithEmail, loginWithGoogle, user } = useAuth();
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = async (formData) => {
        const { email, password } = formData;
        setIsSigningIn(true);
        setError(null);
        try {
            await loginWithEmail(email, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <section className={styles.section}>
            <section className={styles.container}>
                <h2 className={styles.title}>Login</h2>
                <AuthForm fields={loginFields} onSubmit={handleLogin} isSubmitting={isSigningIn} submitButtonText="Login" />
                <p className={`${styles.globalErrorMessage} ${error ? styles.visible : ''}`}>{error}</p>
                <div className={styles.register}>
                    <span>Don’t have an account? </span>
                    <Link to="/register" className={styles.registerLink}>
                        Sign up
                    </Link>
                </div>
                <div className={styles.orSeparator}>
                    <div className={styles.line}></div>
                    <span className={styles.orText}>OR</span>
                    <div className={styles.line}></div>
                </div>
                <Button onClick={loginWithGoogle} className={styles.googleButton} disabled={isSigningIn}>
                    <img src={GoogleIcon} alt="Google Icon" className={styles.googleIcon} />
                    Continue with Google
                </Button>
            </section>
        </section>
    );
};

export default LoginPage;
