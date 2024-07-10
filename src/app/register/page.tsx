"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterProps, registerSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const {
    register, // register input
    handleSubmit, // handle submit
    formState: { errors, isSubmitting }, // form errors
    watch, // watch input value runtime
    getValues, // get all input values at once after submit the form
    setValue, // set input value
    setError, // set error
  } = useForm<RegisterProps>({ resolver: zodResolver(registerSchema) });

  const { username } = watch(); // watch username input

  const onSubmit: SubmitHandler<RegisterProps> = async ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    console.log(username, email, password, confirmPassword);
    console.log(getValues()); // get all input values at once after submit the form

    try {
      // api call to post data
      await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      })
        .then((res) => res.json())
        .then(() => console.log("Data posted successfully"))
        .then(() => {
          // This is how we can set the input bull after submit the form
          setValue("username", "");
          setValue("email", "");
          setValue("password", "");
          setValue("confirmPassword", "");
        });
    } catch (error) {
      setError("root", { message: "Something went wrong" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-9 flex justify-center items-center h-[90vh]">
      <div className="w-[400px] h-auto bg-gray-500 rounded-lg shadow-lg">
        <h1 className="text-2xl text-center text-white p-4">
          Register {username}
        </h1>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 flex flex-col gap-2"
        >
          <label htmlFor="username" className="text-white">
            Username
          </label>
          <input
            {...register("username")}
            type="text"
            placeholder="Username"
            className="w-full p-2 rounded-md mb-2 text-black focus:outline-none"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <label htmlFor="username" className="text-white">
            Email
          </label>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 rounded-md mb-2"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <label htmlFor="username" className="text-white">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded-md mb-2"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <label htmlFor="username" className="text-white">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 rounded-md mb-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
