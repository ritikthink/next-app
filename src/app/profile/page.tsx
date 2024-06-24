"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();

  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("logout response::", response.data);
      router.push("/login");
    } catch (err: any) {
      console.log("Error while login", err);
      toast.error(err.message);
    }
  };
  return (
    <div className="flex flex-col items-center mb-5 justify-center min-h-screen py-2">
      <h1> Profile Page</h1>
      <hr />
      <button
        onClick={onLogout}
        className="bg-blue-500 mt-4  hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
      >
        {" "}
        Logout
      </button>
    </div>
  );
}
