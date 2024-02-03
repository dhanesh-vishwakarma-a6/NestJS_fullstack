"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function SetPasswordPage() {
  const [forgotPasswordToken, setForgotPasswordToken] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const sendResetLink = async () => {
    try {
      setLoading(true);
      await axios
        .post("/api/users/setPassword", { password, forgotPasswordToken })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  // check password & retypePassword to able the send link button
  useEffect(() => {
    if (password === retypePassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password, retypePassword]);

  // get token from url
  useEffect(() => {
    const token = window.location.search.split("=")[1];
    setForgotPasswordToken(token || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {/* password */}
      <label>password </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter password"
      ></input>

      {/* Retype password */}
      <label>Retype password </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={retypePassword}
        onChange={(event) => setRetypePassword(event.target.value)}
        placeholder="Enter password again"
      ></input>

      {/* login up button */}
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 hover:green-500 focus:outline-none focus:border-gray-600"
        onClick={sendResetLink}
        disabled={buttonDisabled}
      >
        Send reset link
      </button>
      <span>{loading ? "sending..." : ""}</span>
    </div>
  );
}
