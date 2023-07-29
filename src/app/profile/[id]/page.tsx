"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type PageParams = {
  params: {
    id: string;
  };
};

export default function UserProfilePage({ params }: PageParams) {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="text-4xl">
        UserProfilePage{" "}
        <span className="bg-blue-500 text-black px-2">{params.id}</span>
      </p>

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
