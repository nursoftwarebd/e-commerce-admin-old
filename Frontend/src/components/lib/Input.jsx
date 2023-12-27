import React from "react";

const Input = ({ placeholder, className, name, type, ...props }) => {
  return (
    <div>
      <input
        {...props}
        name={name}
        type={`${type}`}
        placeholder={`${placeholder}`}
        className={`${className}`}
      />
    </div>
  );
};

export default Input;
