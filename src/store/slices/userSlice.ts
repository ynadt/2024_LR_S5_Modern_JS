import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { auth, googleProvider } from 'firebaseSetup/config.ts';
import { signInWithEmailAndPassword, signInWithRedirect, signOut, getRedirectResult, createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { getErrorMessage } from 'utils/authUtils.ts';

interface User {
    id: string;
    email: string | null;
    displayName?: string | null;
}

interface ErrorDetails {
    code: string;
    message: string;
}

interface UserState {
    user: User | null;
    error: ErrorDetails | null;
    loading: boolean;
}

const initialState: UserState = {
    user: null,
    error: null,
    loading: false,
};

export const loginWithEmail = createAsyncThunk<User, { email: string; password: string }, { rejectValue: ErrorDetails }>(
    'user/loginWithEmail',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return {
                id: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName ?? null,
            };
        } catch (error) {
            if (error instanceof FirebaseError) {
                return rejectWithValue({ code: error.code, message: getErrorMessage(error.code) });
            }
            return rejectWithValue({ code: 'unknown', message: 'An unknown error occurred.' });
        }
    }
);

export const loginWithGoogle = createAsyncThunk<User, void, { rejectValue: ErrorDetails }>('user/loginWithGoogle', async (_, { rejectWithValue }) => {
    try {
        await signInWithRedirect(auth, googleProvider);
        const result = await getRedirectResult(auth);
        if (result?.user) {
            return {
                id: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName ?? null,
            };
        }
        throw new Error('Google login failed');
    } catch (error) {
        if (error instanceof FirebaseError) {
            return rejectWithValue({ code: error.code, message: getErrorMessage(error.code) });
        }
        return rejectWithValue({ code: 'unknown', message: 'Google login failed.' });
    }
});

export const logout = createAsyncThunk<null, void, { rejectValue: ErrorDetails }>('user/logout', async (_, { rejectWithValue }) => {
    try {
        await signOut(auth);
        return null;
    } catch (error) {
        if (error instanceof FirebaseError) {
            return rejectWithValue({ code: error.code, message: getErrorMessage(error.code) });
        }
        return rejectWithValue({ code: 'unknown', message: 'Logout failed.' });
    }
});

export const registerWithEmail = createAsyncThunk<User, { email: string; password: string }, { rejectValue: ErrorDetails }>(
    'user/registerWithEmail',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return {
                id: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName ?? null,
            };
        } catch (error) {
            if (error instanceof FirebaseError) {
                return rejectWithValue({ code: error.code, message: getErrorMessage(error.code) });
            }
            return rejectWithValue({ code: 'unknown', message: 'Registration failed.' });
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // setUser(state, action: PayloadAction<User | null>) {
        //     state.user = action.payload;
        //     state.error = null;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(loginWithEmail.pending, loginWithGoogle.pending, logout.pending), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(isAnyOf(loginWithEmail.fulfilled, loginWithGoogle.fulfilled), (state, action: PayloadAction<User>) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addMatcher(isAnyOf(logout.fulfilled), (state) => {
                state.user = null;
                state.loading = false;
                state.error = null;
            })
            .addMatcher(isAnyOf(loginWithEmail.rejected, loginWithGoogle.rejected, logout.rejected), (state, action) => {
                state.loading = false;
                state.error = action.payload || { code: 'unknown', message: 'An error occurred' };
            })
            .addMatcher(isAnyOf(registerWithEmail.pending, loginWithEmail.pending, loginWithGoogle.pending, logout.pending), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(
                isAnyOf(registerWithEmail.fulfilled, loginWithEmail.fulfilled, loginWithGoogle.fulfilled),
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload;
                    state.loading = false;
                    state.error = null;
                }
            )
            .addMatcher(isAnyOf(registerWithEmail.rejected, loginWithEmail.rejected, loginWithGoogle.rejected, logout.rejected), (state, action) => {
                state.loading = false;
                state.error = action.payload || { code: 'unknown', message: 'An error occurred' };
            });
    },
});

export default userSlice.reducer;
