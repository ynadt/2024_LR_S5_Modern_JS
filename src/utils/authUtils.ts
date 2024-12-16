import { FirebaseError } from 'firebase/app';

type AuthErrorCodes =
    | 'auth/email-already-in-use'
    | 'auth/invalid-email'
    | 'auth/user-not-found'
    | 'auth/wrong-password'
    | 'auth/weak-password'
    | 'auth/too-many-requests'
    | 'auth/operation-not-allowed'
    | 'auth/network-request-failed'
    | 'auth/popup-closed-by-user'
    | 'auth/cancelled-popup-request'
    | 'auth/requires-recent-login'
    | 'auth/invalid-credential';

const errorMessages: Record<AuthErrorCodes, string> = {
    'auth/email-already-in-use': 'This email address is already registered. Please log in or use a different email.',
    'auth/invalid-email': 'The email address is not valid. Please enter a valid email.',
    'auth/user-not-found': 'No user found with this email address. Please check your email or register.',
    'auth/wrong-password': 'Incorrect password. Please try again or reset your password.',
    'auth/weak-password': 'The password is too weak. It should be at least 6 characters long.',
    'auth/too-many-requests': 'Too many unsuccessful login attempts. Please try again later or reset your password.',
    'auth/operation-not-allowed': 'This operation is not allowed. Please contact support.',
    'auth/network-request-failed': 'A network error occurred. Please check your internet connection and try again.',
    'auth/popup-closed-by-user': 'The sign-in popup was closed before completing the sign-in. Please try again.',
    'auth/cancelled-popup-request': 'The sign-in process was canceled. Please try again.',
    'auth/requires-recent-login': 'This operation requires recent authentication. Please log in again.',
    'auth/invalid-credential': 'The provided credentials are invalid. Please check your email and password and try again.',
};

export const getErrorMessage = (error: FirebaseError | string | null | undefined): string => {
    if (typeof error === 'string') {
        return errorMessages[error as AuthErrorCodes] ?? 'An unknown error occurred. Please try again.';
    }

    if (error instanceof FirebaseError) {
        return errorMessages[error.code as AuthErrorCodes] ?? 'An unknown error occurred. Please try again.';
    }

    if (!error) {
        return 'No error information available. Please try again.';
    }

    return 'An unexpected error occurred. Please try again.';
};

// export const retryWithDelay = async <T>(operation: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
//     for (let attempt = 0; attempt <= retries; attempt++) {
//         try {
//             // Attempt the operation
//             return await operation();
//         } catch (err) {
//             // If it's not a retryable error or we've exhausted retries, rethrow
//             if (err instanceof Error && (err.message !== 'auth/network-request-failed' || attempt === retries)) {
//                 throw err;
//             }
//
//             // Otherwise, wait for the specified delay before retrying
//             if (attempt < retries) {
//                 await new Promise((resolve) => setTimeout(resolve, delay));
//             }
//         }
//     }
//
//     throw new Error('Operation failed after all retries.');
// };
