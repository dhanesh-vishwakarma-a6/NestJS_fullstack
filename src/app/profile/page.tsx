"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setUser(res.data.user);
  };

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Welcome {user === undefined ? "nothing" : <Link href={`profile/${user.username}`}>{user.username}</Link>}</p>
      <hr />
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font bold py-2 px-2 rounded"
        onClick={onLogout}
      >
        Logout
      </button>
      <hr />
      <button
        className="bg-stone-500 mt-4 hover:bg-stone-700 text-white font bold py-2 px-2 rounded"
        onClick={getUserDetails}
      >
        Get user
      </button>
    </div>
  );
}
