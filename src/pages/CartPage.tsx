import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from 'components/CartItem/CartItem.tsx';
import Button from 'components/Button/Button.tsx';
import Form from 'components/Form/Form.tsx';
import addressFields from 'data/CartPageAddressData.ts';
import { selectCartItems, selectCartTotalQuantity, selectCartTotalPrice } from 'store/selectors/cartSelectors.ts';
import { removeItemFromCart, changeItemQuantity, clearCart } from 'store/slices/cartSlice.ts';
import styles from './CartPage.module.css';

const CartPage = () => {
    const items = useSelector(selectCartItems);
    const totalQuantity = useSelector(selectCartTotalQuantity);
    const totalPrice = useSelector(selectCartTotalPrice);
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

    const handleOrderSubmit = (formData: Record<string, string>) => {
        console.log('Order submitted with address:', formData);
        dispatch(clearCart());
        navigate('/');
    };

    const toMenuClickHandler = () => {
        navigate('/menu');
    };

    return (
        <section className={styles.section}>
            <div className={styles.cart}>
                <h1 className={styles.title}>Finish your order</h1>
                <div className={styles.cartItemsSection}>
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
                    <div className={styles.orderSummary}>
                        <div className={styles.orderDetails}>
                            <p>Total Items: {totalQuantity}</p>
                            <p className={styles.cartTotal}>Total Price: ${totalPrice.toFixed(2)}</p>
                            <Button onClick={handleClearCart}>Clear cart</Button>
                        </div>
                        <h2 className={styles.shippingTitle}>Enter Shipping Address</h2>
                        <Form fields={addressFields} onSubmit={handleOrderSubmit} isSubmitting={false} submitButtonText="Place Order" />
                    </div>
                )}
            </div>
        </section>
    );
};

export default CartPage;
