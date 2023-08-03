"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleForgotPssword: SubmitHandler<FormValues> = async (formData) => {
    setLoading(true);
    try {
      const { statusText, status, data } = await axios.post(
        "/api/users/forgotPassword",
        formData
      );

      if (statusText === "OK" && status === 200) {
        reset();
        toast.success("Mail send!.");
        router.push("/checkMail");
      } else {
        toast.error(
          `Sending mail error, statusText: ${statusText}, status: ${status}`
        );
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">FORGOT PASSWORD</h1>
      <form
        onSubmit={handleSubmit(handleForgotPssword)}
        className="flex flex-col m-4"
      >
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">Email:-</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            className="p-2 border border-gray-300 rounded-lg  focus:outline-none focus:border-gray-600 text-black"
          />
          {errors?.email && (
            <span>
              {errors?.email.type === "required" && "This field is required"}
              {errors?.email.type === "pattern" && "Invalid Email"}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={!loading ? false : true}
          className="p-2 border border-gray-200 rounded-lg m-4 focus:outline-none focus:border-gray-600 bg-white text-black font-medium disabled:bg-black disabled:text-white hover:border-gray-600 hover:font-semibold"
        >
          {loading ? "Creating..." : "Create New Password"}
        </button>
      </form>

      <Link href={"/login"}>Visit login page</Link>
      <Toaster />
    </div>
  );
}
