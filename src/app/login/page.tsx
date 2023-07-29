"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { statusText, status, data } = await axios.post(
        "/api/users/login",
        user
      );

      if (statusText === "OK" && status === 200) {
        toast.success("Login Successful");
        router.push("/profile");
      } else {
        toast.error(
          `Login failed, statusText: ${statusText}, status: ${status}`
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>

      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      <button
        onClick={handleLogin}
        disabled={
          (user.email.length && user.password.length) || !loading ? false : true
        }
        className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {loading ? "Logging in..." : "Login here"}
      </button>

      <Link href={"/signup"}>Visit signup page</Link>
      <Toaster />
    </div>
  );
}
