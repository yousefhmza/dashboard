import React from "react";
import { Link } from "react-router-dom";
import "./SectionTitle.scss";

const SectionTitle = ({ title, pathToNew }) => {
  return (
    <div className="section-title">
      <span>{title}</span>
      {pathToNew && <Link to={pathToNew}>Add New</Link>}
    </div>
  );
};

export default SectionTitle;
