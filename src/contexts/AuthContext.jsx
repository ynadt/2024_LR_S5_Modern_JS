import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from 'firebaseSetup/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, signOut, getRedirectResult } from 'firebase/auth';
import { getErrorMessage, retryWithDelay } from 'utils/authHelpers.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                try {
                    const result = await getRedirectResult(auth);
                    if (result?.user) {
                        setUser(result.user);
                    } else {
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Error handling redirect result:', error);
                    setUser(null);
                }
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const registerWithEmail = async (email, password) => {
        try {
            return await retryWithDelay(() => createUserWithEmailAndPassword(auth, email, password));
        } catch (err) {
            throw new Error(getErrorMessage(err.code));
        }
    };

    const loginWithEmail = async (email, password) => {
        try {
            return await retryWithDelay(() => signInWithEmailAndPassword(auth, email, password));
        } catch (err) {
            console.error('Login Error:', err.code, err.message);
            throw new Error(getErrorMessage(err.code));
        }
    };

    const loginWithGoogle = async () => {
        try {
            return await retryWithDelay(() => signInWithRedirect(auth, googleProvider));
        } catch (err) {
            throw new Error(getErrorMessage(err.code));
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (err) {
            console.error('Logout Error:', err.code, err.message);
            throw new Error('Failed to log out. Please try again.');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                registerWithEmail,
                loginWithEmail,
                loginWithGoogle,
                logout,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
