import { Navigate } from 'react-router-dom';
import { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store.ts';

interface ProtectedRouteProps {
    element: ComponentType;
    protectionType?: 'auth' | 'guest';
}

const ProtectedRoute = ({ element: Component, protectionType }: ProtectedRouteProps) => {
    const { user } = useSelector((state: RootState) => state.user);

    if (protectionType === 'auth' && !user) {
        return <Navigate to="/login" replace />;
    }

    if (protectionType === 'guest' && user) {
        return <Navigate to="/" replace />;
    }

    return <Component />;
};

export default ProtectedRoute;
