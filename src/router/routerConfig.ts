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
    protected: boolean;
}

const routes: RouteConfig[] = [
    {
        path: '/',
        element: HomePage,
        protected: false,
    },
    {
        path: '/login',
        element: LoginPage,
        protected: false,
    },
    {
        path: '/register',
        element: RegisterPage,
        protected: false,
    },
    {
        path: '/menu',
        element: MenuPage,
        protected: false,
    },
    {
        path: '/cart',
        element: CartPage,
        protected: true,
    },
    {
        path: '*',
        element: ErrorPage,
        protected: false,
    },
];

export default routes;
