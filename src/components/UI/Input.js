import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* spread operator makes sure that all key value pairs are added as properties to the input */}
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
