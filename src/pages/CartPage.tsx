import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from 'components/CartItem/CartItem.tsx';
import Button from 'components/Button/Button.tsx';
import { RootState } from 'store/store.ts';
import { removeItemFromCart, changeItemQuantity, clearCart } from 'store/slices/cartSlice.ts';
import styles from './CartPage.module.css';

const CartPage = () => {
    const { items, totalQuantity, totalPrice } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (id: string) => {
        dispatch(removeItemFromCart(id));
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        dispatch(changeItemQuantity({ id, quantity }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const toMenuClickHandler = () => {
        navigate('/menu');
    };

    return (
        <div className={styles.cart}>
            <h1 className={styles.customTitle}>Cart</h1>
            <div className={styles.cartProductsBox}>
                {items.length > 0 ? (
                    items.map((item) => (
                        <CartItem key={item.id} product={item} removeClickHandler={handleRemove} inputChangeHandler={handleQuantityChange} />
                    ))
                ) : (
                    <div className={styles.cartEmpty}>
                        <p className={styles.cartEmptyMessage}>Your shopping cart is currently empty</p>
                        <p className={styles.cartEmptySubmessage}>Looks like you have not added anything to your cart yet.</p>
                        <Button className={styles.primaryCustomColor} onClick={toMenuClickHandler}>
                            Start Shopping
                        </Button>
                    </div>
                )}
            </div>
            {items.length > 0 && (
                <div className={styles.cartBottomBox}>
                    <div className={styles.cartBottomPart}>
                        <p className={styles.cartTotal}>Total Items: {totalQuantity}</p>
                        <p className={styles.cartDiscounted}>Total Price: ${totalPrice.toFixed(2)}</p>
                        <Button onClick={handleClearCart}>Clear cart</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
