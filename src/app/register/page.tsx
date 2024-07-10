"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterProps, registerSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";

const Register: React.FC<RegisterProps> = () => {
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
      /* await fetch("http://localhost:3000/api/register", {
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
        }); */
    } catch (error) {
      setError("root", { message: "Something went wrong" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-9 flex justify-center items-center h-[90vh]">
      <div className="w-[400px] h-auto bg-gray-500 rounded-lg shadow-lg">
        <h1 className="text-2xl text-center text-white p-4">Register</h1>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 flex flex-col gap-2"
        >
          <Input
            label="Username"
            registerValue={register("username")}
            type="text"
            error={errors.username}
            placeholder="Username"
          />

          <Input
            label="Email"
            registerValue={register("email")}
            error={errors.email}
            placeholder="Email"
          />

          <Input
            label="Password"
            registerValue={register("password")}
            error={errors.password}
            placeholder="Password"
          />

          <Input
            label="Confirm Password"
            registerValue={register("confirmPassword")}
            error={errors.confirmPassword}
            placeholder="Confirm Password"
          />

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
