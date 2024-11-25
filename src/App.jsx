import './App.css';
import MenuPage from 'pages/MenuPage.jsx';
import { CartProvider } from 'contexts/CartContext.jsx';

const App = () => (
    <CartProvider>
        <div className="App">
            <MenuPage />
        </div>
    </CartProvider>
);

export default App;
