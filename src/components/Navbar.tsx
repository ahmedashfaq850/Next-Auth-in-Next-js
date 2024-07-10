import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <ul
        className="
        flex
        justify-between
        items-center
        font-semibold
        px-9 
        py-8
        max-w-5xl   
        mx-auto
        text-lg
        shadow-md
        sticky
        top-0
        z-10
      "
      >
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-10">
          <Link href="/dashboard">
            <li>Dashboard</li>
          </Link>
          <Link href="/login">
            <li>Login</li>
          </Link>
          <Link href="/register">
            <li>Register</li>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
