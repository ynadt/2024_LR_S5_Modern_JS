import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from 'components/AppLayout/AppLayout.jsx';
import { CartProvider } from 'contexts/CartContext.jsx';
import { AuthProvider } from 'contexts/AuthContext.jsx';
import ProtectedRoute from 'router/ProtectedRoute.jsx';
import routes from 'router/routerConfig.js';

const App = () => (
    <AuthProvider>
        <CartProvider>
            <Router>
                <AppLayout>
                    <Routes>
                        {routes.map(({ path, element, protected: protectionType }) => (
                            <Route key={path} path={path} element={<ProtectedRoute element={element} protectionType={protectionType} />} />
                        ))}
                    </Routes>
                </AppLayout>
            </Router>
        </CartProvider>
    </AuthProvider>
);

export default App;
