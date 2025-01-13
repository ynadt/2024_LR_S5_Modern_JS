import { Navigate, useLocation } from 'react-router-dom';
import { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store.ts';

interface ProtectedRouteProps {
    element: ComponentType;
    isProtected: boolean;
}

const ProtectedRoute = ({ element: Component, isProtected }: ProtectedRouteProps) => {
    const { user } = useSelector((state: RootState) => state.user);
    const location = useLocation();

    if (isProtected && !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Component />;
};

export default ProtectedRoute;
