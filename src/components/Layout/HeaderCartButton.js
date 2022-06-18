import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  // useContext causes the header cart button to be reevaluated whenever the context changes
  const cartCtx = useContext(CartContext);

  const { items: cartItems } = cartCtx;

  // reduce takes in an array and reduces it to a value.
  // first arg for recude is callback fn, second is the initial value
  // first argument of the callback fn is the current amount which is passed on to other iterations, second arg is the item being looked at and return is the current val for the next iteration
  // we count this way as we want to count say 3 pieces of sushi as 3 instead of the 1 which we will get if we used .length on the array
  const numberOfCartItems = cartItems.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (cartItems.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartItems]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
