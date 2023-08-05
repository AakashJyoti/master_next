"use client";

import axios from "axios";
import User from "./User";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

type userType = {
  _id: string;
  username: string;
  email: string;
};

export default function UsersListPage() {
  const [userList, setUserList] = React.useState<userType[]>([]);

  React.useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { statusText, status, data } = await axios.get(
          "/api/users/allUsers"
        );
        setUserList(data);
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    };
    getUserInfo();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-4">
      <p className="text-2xl">UsersListPage</p>

      <div className="flex flex-col gap-2">
        {userList?.map((user: userType) => (
          <User user={user} key={user._id} />
        ))}
      </div>

      <Toaster />
    </div>
  );
}
