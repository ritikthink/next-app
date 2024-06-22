"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Singup Success", response.data);
      router.push("/login");
    } catch (err: any) {
      console.log("Error while signup", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-5 justify-center min-h-screen py-2">
      <h1 className="text-center text-red-500 text-2xl mb-5">
        {loading ? "Processing..." : "SignUp"}
      </h1>
      <hr />
      <label htmlFor="signup-username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="signup-username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter Username"
        autoComplete="off"
        name={`username_${Math.random().toString(36).substring(2, 15)}`}
      />

      <label htmlFor="signup-email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="signup-email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter Email"
        autoComplete="off"
        name={`email_${Math.random().toString(36).substring(2, 15)}`}
      />

      <label htmlFor="signup-password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="signup-password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter Password"
        autoComplete="off"
        name={`password_${Math.random().toString(36).substring(2, 15)}`}
      />

      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignup}
      >
        {buttonDisabled ? "Sign Up" : "No Sign Up"}
      </button>
      <Link href="/login" className="text-blue-600">
        Visit Login Here...
      </Link>
    </div>
  );
}
