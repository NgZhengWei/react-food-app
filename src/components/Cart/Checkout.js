import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const postal = postalInputRef.current.value;
    const city = cityInputRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const postalIsValid = isSixChars(postal);
    const cityIsValid = !isEmpty(city);

    setFormInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name,
      street,
      postal,
      city,
    });
  };

  return (
    <form onSubmit={formSubmitHandler} className={classes.form}>
      <div
        className={`${classes.control} ${
          formInputValidity.name ? '' : classes.invalid
        }`}
      >
        <label htmlFor='name'>Your Name</label>
        <input id='name' type='text' ref={nameInputRef} />
        {!formInputValidity.name && <p>Enter a valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.street ? '' : classes.invalid
        }`}
      >
        <label htmlFor='street'>Street</label>
        <input id='street' type='text' ref={streetInputRef} />
        {!formInputValidity.street && <p>Enter a valid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.postal ? '' : classes.invalid
        }`}
      >
        <label htmlFor='postal'>Postal Code</label>
        <input id='postal' type='text' ref={postalInputRef} />
        {!formInputValidity.postal && (
          <p>Enter a valid postal code(6 chars long)</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.city ? '' : classes.invalid
        }`}
      >
        <label htmlFor='city'>City</label>
        <input id='city' type='text' ref={cityInputRef} />
        {!formInputValidity.city && <p>Enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onHideCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
