import React from "react";
import { FaTimes } from "react-icons/fa";

const SideBarContent = ({ setCollapsed1 }) => {
  return (
    <div className="w-full flex flex-col">
      <div
        className="flex justify-end lg:hidden p-5"
        onClick={() => setCollapsed1(false)}
      >
        <FaTimes className="text-white" />
      </div>
    </div>
  );
};

export default SideBarContent;
