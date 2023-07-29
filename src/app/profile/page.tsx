"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

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
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getloggedUserInfo = async () => {
    try {
      const { statusText, status, data } = await axios.get(
        "/api/users/logedUserInfo"
      );
      console.log(data.data._id);
      router.push(`/profile/${data.data._id}`);
      // if (statusText === "OK" && status === 200) {
      //   console.log(data);
      // } else {
      //   toast.error(
      //     `Logut failed, statusText: ${statusText}, status: ${status}`
      //   );
      // }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    getloggedUserInfo();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      <h1 className="text-3xl">ProfilePage</h1>
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
