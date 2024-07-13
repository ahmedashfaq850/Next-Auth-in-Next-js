"use client";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { LoginProps } from "./types";
import { loginSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login: React.FC<LoginProps> = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

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
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("root", { message: "Invalid Email or Password" });
      }
      if (res?.url) {
        router.replace("/dashboard");
      }
    } catch (error) {
      setError("root", { message: "Something went wrong" });
    }
  };

  if (sessionStatus === "loading") {
    return (
      <div
        className="
      max-w-5xl
      mx-auto
      px-9
      flex
      justify-center
      items-center
      h-[90vh]
    "
      >
        Loading...
      </div>
    );
  }

  return (
    sessionStatus === "unauthenticated" && (
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
    )
  );
};

export default Login;
