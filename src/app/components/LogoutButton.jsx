"use client";

import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  return (
    <button
      className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
