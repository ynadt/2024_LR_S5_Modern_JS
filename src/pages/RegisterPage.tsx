import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'store/store.ts';
import { registerWithEmail, loginWithGoogle } from 'store/slices/userSlice.ts';
import AuthForm from 'components/AuthForm/AuthForm.tsx';
import Button from 'components/Button/Button.js';
import registerFields from 'data/RegisterPageData.js';
import GoogleIcon from 'src/assets/icons/google-icon.svg';
import styles from 'pages/LoginPage.module.css';

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, error, loading } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleRegister = async (formData: Record<string, string>) => {
        const { email, password } = formData;

        try {
            await dispatch(registerWithEmail({ email, password })).unwrap();
        } catch (err) {
            console.error('Registration failed:', err);
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
            <div className={styles.container}>
                <h2 className={styles.title}>Register</h2>
                <AuthForm fields={registerFields} onSubmit={handleRegister} isSubmitting={loading} submitButtonText="Register" />
                {error && <p className={styles.errorMessage}>{error.message}</p>}
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
                <Button onClick={handleGoogleLogin} disabled={loading} className={styles.googleButton}>
                    <img src={GoogleIcon} alt="Google Icon" className={styles.googleIcon} />
                    Continue with Google
                </Button>
            </div>
        </section>
    );
};

export default RegisterPage;
