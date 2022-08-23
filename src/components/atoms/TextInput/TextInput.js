import React from "react";
import "./TextInput.scss";

const TextInput = (props) => {
  return (
    <div className="text-input">
      <label htmlFor={props.id}>{props.label}</label>
      <input className={props.error && "error-input"} {...props} />
      {props.error && <p>{props.error}</p>}
    </div>
  );
};

export default TextInput;
