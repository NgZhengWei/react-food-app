import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';

import classes from './Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [formIsShown, setFormIsShown] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const {
    isLoading: isSubmitting,
    error,
    sendRequest: sendPostReq,
  } = useHttp();

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderSubmitHandler = (userData) => {
    // submit form data to backend
    sendPostReq(
      {
        url: 'https://react-learning-4d125-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          user: userData,
          order: cartCtx.items,
          totalAmount: cartCtx.totalAmount,
        },
      },
      (data) => {
        console.log(data);
        setDidSubmit(true);
        cartCtx.clearCart();
      }
    );
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const cartHasItems = cartCtx.items.length > 0;

  const orderHandler = () => {
    // props.onHideCart();
    setFormIsShown(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onHideCart} className={classes['button--alt']}>
        Close
      </button>
      {cartHasItems && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {formIsShown && (
        <Checkout
          onHideCart={props.onHideCart}
          onConfirm={orderSubmitHandler}
        />
      )}
      {!formIsShown && modalActions}
    </>
  );

  let modalContent;
  if (error) {
    modalContent = <p>{error}</p>;
  } else if (isSubmitting) {
    modalContent = <p>Submitting your order...</p>;
  } else if (didSubmit) {
    modalContent = (
      <>
        <p>Your order has been successfully submitted!</p>
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.button}
            onClick={props.onHideCart}
          >
            Close
          </button>
        </div>
      </>
    );
  } else {
    modalContent = cartModalContent;
  }

  return <Modal onBackdropClick={props.onHideCart}>{modalContent}</Modal>;
};

export default Cart;
