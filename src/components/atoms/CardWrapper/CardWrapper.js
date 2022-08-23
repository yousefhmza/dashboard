import React from "react";
import "./CardWrapper.scss";

const CardWrapper = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default CardWrapper;
