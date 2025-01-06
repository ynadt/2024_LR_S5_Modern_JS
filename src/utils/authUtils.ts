import { FirebaseError } from 'firebase/app';

export enum AuthErrorCodes {
    EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
    INVALID_EMAIL = 'auth/invalid-email',
    USER_NOT_FOUND = 'auth/user-not-found',
    WRONG_PASSWORD = 'auth/wrong-password',
    WEAK_PASSWORD = 'auth/weak-password',
    TOO_MANY_REQUESTS = 'auth/too-many-requests',
    OPERATION_NOT_ALLOWED = 'auth/operation-not-allowed',
    NETWORK_REQUEST_FAILED = 'auth/network-request-failed',
    POPUP_CLOSED_BY_USER = 'auth/popup-closed-by-user',
    CANCELLED_POPUP_REQUEST = 'auth/cancelled-popup-request',
    REQUIRES_RECENT_LOGIN = 'auth/requires-recent-login',
    INVALID_CREDENTIAL = 'auth/invalid-credential',
}

const errorMessages: Record<AuthErrorCodes, string> = {
    [AuthErrorCodes.EMAIL_ALREADY_IN_USE]: 'This email address is already registered. Please log in or use a different email.',
    [AuthErrorCodes.INVALID_EMAIL]: 'The email address is not valid. Please enter a valid email.',
    [AuthErrorCodes.USER_NOT_FOUND]: 'No user found with this email address. Please check your email or register.',
    [AuthErrorCodes.WRONG_PASSWORD]: 'Incorrect password. Please try again or reset your password.',
    [AuthErrorCodes.WEAK_PASSWORD]: 'The password is too weak. It should be at least 6 characters long.',
    [AuthErrorCodes.TOO_MANY_REQUESTS]: 'Too many unsuccessful login attempts. Please try again later or reset your password.',
    [AuthErrorCodes.OPERATION_NOT_ALLOWED]: 'This operation is not allowed. Please contact support.',
    [AuthErrorCodes.NETWORK_REQUEST_FAILED]: 'A network error occurred. Please check your internet connection and try again.',
    [AuthErrorCodes.POPUP_CLOSED_BY_USER]: 'The sign-in popup was closed before completing the sign-in. Please try again.',
    [AuthErrorCodes.CANCELLED_POPUP_REQUEST]: 'The sign-in process was canceled. Please try again.',
    [AuthErrorCodes.REQUIRES_RECENT_LOGIN]: 'This operation requires recent authentication. Please log in again.',
    [AuthErrorCodes.INVALID_CREDENTIAL]: 'The provided credentials are invalid. Please check your email and password and try again.',
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
