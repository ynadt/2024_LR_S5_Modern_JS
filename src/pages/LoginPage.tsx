import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState, AppDispatch } from 'store/store.ts';
import { loginWithEmail, loginWithGoogle } from 'store/slices/userSlice.ts';
import AuthForm from 'components/AuthForm/AuthForm.tsx';
import Button from 'components/Button/Button.js';
import loginFields from 'data/LoginPageData.js';
import GoogleIcon from 'assets/icons/google-icon.svg';
import styles from 'pages/LoginPage.module.css';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, error, loading } = useSelector((state: RootState) => state.user); // Use loading from Redux state
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = async (formData: Record<string, string>) => {
        const { email, password } = formData;

        try {
            await dispatch(loginWithEmail({ email, password })).unwrap();
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await dispatch(loginWithGoogle()).unwrap();
        } catch (err) {
            console.error('Google login failed:', err);
        }
    };

    return (
        <section className={styles.section}>
            <section className={styles.container}>
                <h2 className={styles.title}>Login</h2>
                <AuthForm fields={loginFields} onSubmit={handleLogin} isSubmitting={loading} submitButtonText="Login" />
                {error && <p className={styles.errorMessage}>{error.message}</p>}
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
                <Button onClick={handleGoogleLogin} className={styles.googleButton} disabled={loading}>
                    <img src={GoogleIcon} alt="Google Icon" className={styles.googleIcon} />
                    Continue with Google
                </Button>
            </section>
        </section>
    );
};

export default LoginPage;
