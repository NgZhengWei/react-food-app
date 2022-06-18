import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartValue = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  if (action.type === 'ADD') {
    const newTotalAmount =
      prevState.totalAmount + action.item.amount * action.item.price;

    let newCartItems;
    // checks for existance of item in prevState, if exists returns its index
    const existingItemIndex = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );

    if (existingItemIndex !== -1) {
      newCartItems = [...prevState.items];
      newCartItems[existingItemIndex].amount += action.item.amount;
    } else {
      // use concat here to return new array instead of editing prev array as it will confuse react
      newCartItems = prevState.items.concat(action.item);
    }

    return { items: newCartItems, totalAmount: newTotalAmount };
  } else if (action.type === 'REMOVE') {
    const newItemsState = { ...prevState }; //shallow copy
    const existingItemIndex = prevState.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = newItemsState.items[existingItemIndex];

    if (existingItem.amount > 1) {
      existingItem.amount -= 1;
      newItemsState.totalAmount -= existingItem.price;
    } else {
      newItemsState.totalAmount -= existingItem.price;
      console.dir(newItemsState);
      newItemsState.items.splice(existingItemIndex, 1);
    }

    return newItemsState;
  } else if (action.type === 'ADD1') {
    const newItemsState = { ...prevState };

    // checks for existance of item in prevState, if exists returns its index
    const existingItemIndex = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = newItemsState.items[existingItemIndex];

    newItemsState.totalAmount += existingItem.price;
    existingItem.amount += 1;

    return newItemsState;
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
