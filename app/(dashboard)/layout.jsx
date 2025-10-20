import React from "react";
import Navbar from "./_components/NavBar";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="p-2">{children}</div>
    </div>
  );
};

export default layout;
