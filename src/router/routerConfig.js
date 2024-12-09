import HomePage from 'pages/HomePage.jsx';
import RegisterPage from 'pages/RegisterPage.jsx';
import LoginPage from 'pages/LoginPage.jsx';
import MenuPage from 'pages/MenuPage.jsx';
import CartPage from 'pages/CartPage.jsx';
import ErrorPage from 'pages/ErrorPage.jsx';

const routes = [
    {
        path: '/',
        element: HomePage,
        protected: undefined,
    },
    {
        path: '/login',
        element: LoginPage,
        protected: 'guest',
    },
    {
        path: '/register',
        element: RegisterPage,
        protected: 'guest',
    },
    {
        path: '/menu',
        element: MenuPage,
        protected: undefined,
    },
    {
        path: '/cart',
        element: CartPage,
        protected: 'auth',
    },
    {
        path: '*',
        element: ErrorPage,
        protected: undefined,
    },
];

export default routes;
