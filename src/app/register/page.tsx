"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterProps, registerSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import Form from "@/components/Form";

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
      <Form
        errors={errors.root}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        buttonText="Register"
        title="Register"
      >
        <div>
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
        </div>
      </Form>
    </div>
  );
};

export default Register;
