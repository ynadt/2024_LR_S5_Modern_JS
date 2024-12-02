import './App.css';
// import MenuPage from 'pages/MenuPage.jsx';
import { CartProvider } from 'contexts/CartContext.jsx';
import HomePage from 'pages/HomePage.jsx';

const App = () => (
    <CartProvider>
        <div className="App">
            {/*<MenuPage />*/}
            <HomePage />
        </div>
    </CartProvider>
);

export default App;
