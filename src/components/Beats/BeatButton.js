import React from "react";

const BeatButton = ({ className, handleClick, name }) => {
  return (
    <button className={className} onClick={handleClick}>
      {name.toUpperCase()}
    </button>
  );
};

export default BeatButton;
