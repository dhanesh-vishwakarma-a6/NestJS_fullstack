"use client";

import axios from "axios";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendResetLink = async () => {
    try {
      setLoading(true);
      // getting 400 in axios for this POST api
      await axios
        .post("/api/users/forgotPassword", { email: email })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login Page</h1>

      {/* email */}
      <label className="p-2 m-2">Email </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter registered email"
      ></input>

      {/* send link button */}
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 hover:bg-green-700 focus:outline-none focus:border-gray-600"
        onClick={sendResetLink}
        disabled={loading}
      >
        Send reset link
      </button>
      <span>{loading ? "sending...." : ""}</span>
    </div>
  );
}
