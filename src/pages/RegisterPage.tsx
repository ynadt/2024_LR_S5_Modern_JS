import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'store/store.ts';
import { registerWithEmail, loginWithGoogle } from 'store/slices/userSlice.ts';
import Form from 'components/Form/Form.tsx';
import Button from 'components/Button/Button.js';
import registerFields from 'data/RegisterPageData.js';
import GoogleIcon from 'src/assets/icons/google-icon.svg';
import { toast } from 'react-toastify';
import styles from 'pages/LoginPage.module.css';

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, error, loading } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (user) {
            navigate(from !== '/login' ? from : '/', { replace: true });
        }
    }, [user, navigate, from]);

    const handleRegister = async (formData: Record<string, string>) => {
        const { email, password } = formData;

        try {
            await dispatch(registerWithEmail({ email, password })).unwrap();
            toast.success('Registration successful!');
        } catch (err) {
            console.error('Registration failed:', err);
            toast.error('Registration failed. Please try again.');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await dispatch(loginWithGoogle()).unwrap();
            toast.success('Google login successful!');
        } catch (err) {
            console.error('Google login failed:', err);
            toast.error('Google login failed. Please try again.');
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.title}>Register</h1>
                <Form fields={registerFields} onSubmit={handleRegister} isSubmitting={loading} submitButtonText="Register" />
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
