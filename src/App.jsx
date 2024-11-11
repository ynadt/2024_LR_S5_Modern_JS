import { Component } from 'react';
import './App.css';
import MenuPage from 'pages/MenuPage.jsx';
import { CartProvider } from 'contexts/CartContext.jsx';

class App extends Component {
    render() {
        return (
            <CartProvider>
                <div className="App">
                    <MenuPage />
                </div>
            </CartProvider>
        );
    }
}

export default App;
