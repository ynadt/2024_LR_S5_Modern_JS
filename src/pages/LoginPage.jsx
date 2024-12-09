import { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'components/Button/Button.jsx';
import { validateEmail, validatePassword } from 'utils/validation';
import GoogleIcon from 'src/assets/icons/google-icon.svg';
import EyeIcon from 'src/assets/icons/eye-icon.svg';
import EyeClosedIcon from 'src/assets/icons/eye-closed-icon.svg';
import ClueIcon from 'assets/icons/clue-icon.svg';
import styles from 'pages/LoginPage.module.css';

const LoginPage = () => {
    const { loginWithEmail, loginWithGoogle, user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState(null);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        } else {
            setEmailError('');
        }

        if (!validatePassword(password)) {
            setPasswordError('Check your password. It does not follow the rules.');
            return;
        } else {
            setPasswordError('');
        }

        setIsSigningIn(true);
        try {
            await loginWithEmail(email, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSigningIn(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsSigningIn(true);
            await loginWithGoogle();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSigningIn(false);
        }
    };

    const isFormValid = validateEmail(email) && validatePassword(password);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (!validatePassword(value)) {
            setPasswordError('Check your password. It does not follow the rules.');
        } else {
            setPasswordError('');
        }
    };

    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    <h2 className={styles.title}>Login</h2>
                    <form onSubmit={handleLogin} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                                <span className={styles.tooltip}>
                                    <img src={ClueIcon} alt="Rules" className={styles.clueIcon} />
                                    <span className={styles.tooltipText}>Please enter a valid email address.</span>
                                </span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                autoComplete="email"
                                className={`${styles.input} ${emailError ? styles.invalid : ''}`}
                            />
                            {emailError && <p className={styles.errorMessage}>{emailError}</p>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Password
                                <span className={styles.tooltip}>
                                    <img src={ClueIcon} alt="Rules" className={styles.clueIcon} />
                                    <span className={styles.tooltipText}>
                                        Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter,
                                        one number, and only English letters.
                                    </span>
                                </span>
                            </label>
                            <div className={styles.passwordContainer}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    autoComplete="current-password"
                                    className={`${styles.input} ${passwordError ? styles.invalid : ''}`}
                                />
                                <img
                                    src={showPassword ? EyeIcon : EyeClosedIcon}
                                    alt="Toggle Password Visibility"
                                    className={styles.eyeIcon}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                />
                            </div>
                            {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
                        </div>

                        <Button type="submit" disabled={!isFormValid || isSigningIn} className={styles.submitButton}>
                            {isSigningIn ? 'Signing In...' : 'Login'}
                        </Button>
                    </form>
                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <div className={styles.register}>
                        <span>Do not have an account? </span>
                        <Link to="/register" className={styles.registerLink}>
                            Sign up
                        </Link>
                    </div>
                    <div className={styles.orSeparator}>
                        <div className={styles.line}></div>
                        <span className={styles.orText}>OR</span>
                        <div className={styles.line}></div>
                    </div>

                    <Button onClick={handleGoogleLogin} className={styles.googleButton} disabled={isSigningIn}>
                        <img src={GoogleIcon} alt="Google Icon" className={styles.googleIcon} />
                        Continue with Google
                    </Button>
                </div>
            </main>
        </>
    );
};

export default LoginPage;
