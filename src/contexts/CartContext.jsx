import { createContext, useState } from 'react';

const cartContext = createContext({ cartCount: 0, incrementCartCount: () => {} });

const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const incrementCartCount = () => {
        setCartCount((prevCount) => prevCount + 1);
    };
    return <cartContext.Provider value={{ cartCount, incrementCartCount }}>{children}</cartContext.Provider>;
};

export { cartContext as CartContext, CartProvider };
