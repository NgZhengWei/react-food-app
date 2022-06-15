import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartValue = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  if (action.type === 'ADD') {
    // use concat here to return new array instead of editing prev array as it will confuse react
    const newCartItems = prevState.items.concat(action.item);
    const newTotalAmount =
      prevState.totalAmount + action.item.amount * action.item.price;
    return { items: newCartItems, totalAmount: newTotalAmount };
  } else if (action.type === 'REMOVE') {
  }

  return defaultCartValue;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartValue
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
