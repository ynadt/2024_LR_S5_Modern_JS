import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from 'components/AppLayout/AppLayout.js';
import ProtectedRoute from 'router/ProtectedRoute.js';
import routes from 'router/routerConfig.js';

const App = () => (
    <Router>
        <Routes>
            <Route element={<AppLayout />}>
                {routes.map(({ path, element, protected: isProtected }) => (
                    <Route key={path} path={path} element={<ProtectedRoute element={element} isProtected={isProtected} />} />
                ))}
            </Route>
        </Routes>
    </Router>
);

export default App;
