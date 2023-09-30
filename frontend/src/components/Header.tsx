import React from "react";
import Register from "./Register";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className=" flex justify-between mx-12 mt-4 ">
      <h1 className="font-bold text-3xl">Blog</h1>

      <Register />
    </div>
  );
};

export default Header;
