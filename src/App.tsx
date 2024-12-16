import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from 'components/AppLayout/AppLayout.js';
import ProtectedRoute from 'router/ProtectedRoute.js';
import routes from 'router/routerConfig.js';

const App = () => (
    <Router>
        <AppLayout>
            <Routes>
                {routes.map(({ path, element, protected: protectionType }) => (
                    <Route key={path} path={path} element={<ProtectedRoute element={element} protectionType={protectionType} />} />
                ))}
            </Routes>
        </AppLayout>
    </Router>
);

export default App;
