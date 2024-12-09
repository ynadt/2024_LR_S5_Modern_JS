import { Navigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const ProtectedRoute = ({ element, protectionType }) => {
    const Component = element;
    const { user, loading } = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }
    if (protectionType === 'auth' && !user) {
        return <Navigate to="/login" replace />;
    } else if (protectionType === 'guest' && user) {
        return <Navigate to="/" replace />;
    }

    return <Component />;
};

export default ProtectedRoute;
