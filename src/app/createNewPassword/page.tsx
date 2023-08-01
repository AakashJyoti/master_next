"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  password: string;
  confirm_password: string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [token, setToken] = React.useState<string>("");
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
        "/api/users/createNewPassword",
        {
          token,
          password: formData.password,
        }
      );
      if (statusText === "OK" && status === 200) {
        reset();
        toast.success("Password updated Successful");
        router.push("/login");
      } else {
        toast.error(
          `Password updated failed, statusText: ${statusText}, status: ${status}`
        );
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">LOGIN</h1>
      <form
        onSubmit={handleSubmit(handleForgotPssword)}
        className="flex flex-col m-4"
      >
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

        <div className="mb-4 flex flex-col">
          <label htmlFor="password">Confirm Password:-</label>
          <input
            type="password"
            id="confirm_password"
            placeholder="Password"
            {...register("confirm_password", {
              required: true,
              maxLength: 8,
              minLength: 6,
            })}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
          />
          {errors?.confirm_password && (
            <span>
              {errors?.confirm_password.type === "required" &&
                "This field is required"}
              {errors?.confirm_password.type === "maxLength" &&
                "Minimum 6 digit requird"}
              {errors?.confirm_password.type === "minLength" &&
                "Maximum 8 digit required"}
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

      <Link href={"/signup"}>Visit signup page</Link>
      <Toaster />
    </div>
  );
}
