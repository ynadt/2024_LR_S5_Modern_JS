export const getErrorMessage = (code) => {
    switch (code) {
        case 'auth/email-already-in-use':
            return 'This email address is already registered. Please log in or use a different email.';
        case 'auth/invalid-email':
            return 'The email address is not valid. Please enter a valid email.';
        case 'auth/user-not-found':
            return 'No user found with this email address. Please check your email or register.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again or reset your password.';
        case 'auth/weak-password':
            return 'The password is too weak. It should be at least 6 characters long.';
        case 'auth/too-many-requests':
            return 'Too many unsuccessful login attempts. Please try again later or reset your password.';
        case 'auth/operation-not-allowed':
            return 'This operation is not allowed. Please contact support.';
        case 'auth/network-request-failed':
            return 'A network error occurred. Please check your internet connection and try again.';
        case 'auth/popup-closed-by-user':
            return 'The sign-in popup was closed before completing the sign-in. Please try again.';
        case 'auth/cancelled-popup-request':
            return 'The sign-in process was canceled. Please try again.';
        case 'auth/requires-recent-login':
            return 'This operation requires recent authentication. Please log in again.';
        case 'auth/invalid-credential':
            return 'The provided credentials are invalid. Please check your email and password and try again.';
        default:
            return 'An unknown error occurred. Please try again.';
    }
};

export const retryWithDelay = async (operation, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await operation();
        } catch (err) {
            if (err.code === 'auth/network-request-failed' && i < retries - 1) {
                await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
                throw err;
            }
        }
    }
};
