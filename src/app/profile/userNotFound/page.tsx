"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoggedUserInfo() {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { statusText, status, data } = await axios.get("/api/users/logout");
      if (statusText === "OK" && status === 200) {
        toast.success("Logout Successful");
        router.push("/login");
      } else {
        toast.error(
          `Logut failed, statusText: ${statusText}, status: ${status}`
        );
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Logged user is not found</h1>
      <button
        onClick={handleLogout}
        className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {loading ? "Loging out..." : "Logout"}
      </button>
      <Toaster />
    </div>
  );
}
