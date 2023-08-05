"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

type UserInfoType = {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
  __v: number;
};

const userInitialState = {
  _id: "",
  username: "",
  email: "",
  isVerified: false,
  isAdmin: false,
  __v: 0,
};

export default function ProfilePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] =
    React.useState<UserInfoType>(userInitialState);

  React.useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { statusText, status, data } = await axios.get(
          "/api/users/logedUserInfo"
        );
        setUserInfo(data.data);
      } catch (error: any) {
        router.push("/profile/userNotFound");
        toast.error(error.response.data.error);
      }
    };
    getUserInfo();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      <h1 className="text-3xl">ProfilePage</h1>
      <Link
        href={`/profile/${userInfo._id}`}
        className="p-2 border border-gray-200 rounded-lg m-4 focus:outline-none focus:border-gray-600 bg-white text-black font-medium disabled:bg-black disabled:text-white hover:border-gray-600 hover:font-semibold"
      >
        User Profile
      </Link>
      {userInfo.isAdmin && (
        <Link
          href={`/userList`}
          className="p-2 border border-gray-200 rounded-lg m-4 focus:outline-none focus:border-gray-600 bg-white text-black font-medium disabled:bg-black disabled:text-white hover:border-gray-600 hover:font-semibold"
        >
          Users List
        </Link>
      )}

      <Toaster />
    </div>
  );
}
