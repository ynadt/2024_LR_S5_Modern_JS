import React, { Component } from 'react';

const cartContext = React.createContext({ cartCount: 0 });

class CartProvider extends Component {
    state = {
        cartCount: 0,
    };

    incrementCartCount = () => {
        this.setState((prevState) => ({
            cartCount: prevState.cartCount + 1,
        }));
    };

    render() {
        const { cartCount } = this.state;
        const { incrementCartCount } = this;

        return <cartContext.Provider value={{ cartCount, incrementCartCount }}>{this.props.children}</cartContext.Provider>;
    }
}

export { cartContext as CartContext, CartProvider };
