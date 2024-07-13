"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
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
          {session?.user && (
            <Link href="/dashboard">
              <li>Dashboard</li>
            </Link>
          )}
          {!session ? (
            <>
              <Link href="/login">
                <li>Login</li>
              </Link>
              <Link href="/register">
                <li>Register</li>
              </Link>
            </>
          ) : (
            <>
              <p>{session.user?.email}</p>
              <button onClick={() => signOut()}>Sign Out</button>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
