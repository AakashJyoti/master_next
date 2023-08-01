"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  React.useEffect(() => {
    const getloggedUserInfo = async () => {
      try {
        const { statusText, status, data } = await axios.get(
          "/api/users/logedUserInfo"
        );
        console.log(data.data._id);
        router.push(`/profile/${data.data._id}`);
      } catch (error: any) {
        router.push("/profile/userNotFound");
        toast.error(error.response.data.error);
      }
    };
    getloggedUserInfo();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      <h1 className="text-3xl">ProfilePage</h1>
      <h1 className="text-3xl">Loaging userInfo...</h1>
      <Toaster />
    </div>
  );
}
