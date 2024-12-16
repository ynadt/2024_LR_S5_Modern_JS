import { ComponentType } from 'react';
import HomePage from 'pages/HomePage.js';
import RegisterPage from 'pages/RegisterPage.js';
import LoginPage from 'pages/LoginPage.js';
import MenuPage from 'pages/MenuPage.js';
import CartPage from 'pages/CartPage.js';
import ErrorPage from 'pages/ErrorPage.js';

interface RouteConfig {
    path: string;
    element: ComponentType;
    protected?: 'auth' | 'guest';
}

const routes: RouteConfig[] = [
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
