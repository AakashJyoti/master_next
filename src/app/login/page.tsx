"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleLogin: SubmitHandler<FormValues> = async (formData) => {
    setLoading(true);
    try {
      const { statusText, status, data } = await axios.post(
        "/api/users/login",
        {
          email: formData.email.toLowerCase(),
          password: formData.password,
        }
      );

      if (statusText === "OK" && status === 200) {
        reset();
        toast.success("Login Successful");
        router.push("/profile");
      } else {
        toast.error(
          `Login failed, statusText: ${statusText}, status: ${status}`
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
      <h1 className="text-4xl">LOGIN</h1>
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col m-4">
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
        <div className="mb-4 flex flex-col">
          <label htmlFor="password">Password:-</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              maxLength: 8,
              minLength: 6,
            })}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
          />
          {errors?.password && (
            <span>
              {errors?.password.type === "required" && "This field is required"}
              {errors?.password.type === "maxLength" &&
                "Minimum 6 digit requird"}
              {errors?.password.type === "minLength" &&
                "Maximum 8 digit required"}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={!loading ? false : true}
          className="p-2 border border-gray-200 rounded-lg m-4 focus:outline-none focus:border-gray-600 bg-white text-black font-medium disabled:bg-black disabled:text-white hover:border-gray-600 hover:font-semibold"
        >
          {loading ? "Logging in..." : "Login here"}
        </button>
      </form>

      <Link href={"/signup"}>Visit signup page</Link>
      <Link
        href={"/forgotPassword"}
        className="mt-4 text-blue-300 hover:text-blue-400"
      >
        Forgot Password ?
      </Link>
      <Toaster />
    </div>
  );
}
