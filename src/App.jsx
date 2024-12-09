import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from 'contexts/CartContext.jsx';
import ProtectedRoute from 'router/ProtectedRoute.jsx';
import routes from 'router/routerConfig.js';
import { AuthProvider } from 'contexts/AuthContext.jsx';

const App = () => (
    <AuthProvider>
        <CartProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {routes.map(({ path, element, protected: protectionType }) => (
                            <Route key={path} path={path} element={<ProtectedRoute element={element} protectionType={protectionType} />} />
                        ))}
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    </AuthProvider>
);

export default App;
