"use client";

import axios from "axios";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = React.useState<string>("");
  const [verified, setVerified] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (token.length) {
      const verifyUserEmail = async () => {
        setLoading(true);
        try {
          const { statusText, status, data } = await axios.post(
            "/api/users/verifyemail",
            {
              token,
            }
          );

          if (status === 200) {
            toast.success("Email verification Successful");
            setVerified(true);
          } else {
            toast.error(
              `Email verification failed, statusText: ${statusText}, status: ${status}`
            );
          }
        } catch (error: any) {
          setError(true);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };
      verifyUserEmail();
    }
  }, [token]);

  React.useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-blue-600 text-white">
        {token ? token : "no token"}
      </h2>
      {loading ? "Verifiing email..." : null}
      {verified ? (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      ) : null}
      {error ? (
        <div>
          <h2 className="text-2xl text-red-500">Error occured!..</h2>
        </div>
      ) : null}
      <Toaster />
    </div>
  );
}
