"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { LoginProps } from "./types";
import { loginSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";

const Login: React.FC<LoginProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    watch,
    setValue,
    getValues,
    setError,
  } = useForm<LoginProps>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginProps> = async ({ email, password }) => {
    try {
      console.log(getValues());
    } catch (error) {
      setError("root", { message: "Something went wrong" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-9 flex justify-center items-center h-[90vh]">
      <Form
        errors={errors.root}
        isSubmitting={isLoading}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        buttonText="Login"
        title="Login"
      >
        <div>
          <Input
            label="Email"
            registerValue={register("email")}
            error={errors.email}
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            registerValue={register("password")}
            error={errors.password}
            placeholder="Enter your password"
            type="password"
          />
        </div>
      </Form>
    </div>
  );
};

export default Login;
