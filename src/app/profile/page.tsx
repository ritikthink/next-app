"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

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

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response.data);
    setData(response.data.data._id);
  };
  return (
    <div className="flex flex-col items-center mb-5 justify-center min-h-screen py-2">
      <h1> Profile Page</h1>
      <h2 className="p-3 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />

      <button
        onClick={getUserDetails}
        className="bg-green-700 mt-4  hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
      >
        {" "}
        Get User Details
      </button>
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
