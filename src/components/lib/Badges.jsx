import React from "react";

const Badges = ({ title, color }) => {
  return (
    <span
      className={`bg-${color}-100 text-${color}-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}
    >
      {title}
    </span>
  );
};

export default Badges;
