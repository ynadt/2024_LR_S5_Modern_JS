import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDUF7UTgMj78Xnt9evws1q9ODK8k_ia6Ls',
    authDomain: 'react-uni-24.firebaseapp.com',
    projectId: 'react-uni-24',
    storageBucket: 'react-uni-24.firebasestorage.app',
    messagingSenderId: '519795846012',
    appId: '1:519795846012:web:621f3fae5790dd583ad2f9',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
