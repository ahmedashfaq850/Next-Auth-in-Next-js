import { z } from "zod";

// Password validation regex to check for at least one lowercase letter, one uppercase letter, one digit, and one special character
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerSchema = z
  .object({
    username: z.string().min(1, "Please Enter your username"),
    email: z
      .string()
      .min(1, "Please Enter your email address")
      .email("Please Enter a valid email address"),
    password: z
      .string()
      .min(1, "Please Enter a Password")
      .regex(
        passwordRegex,
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
      ),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterProps = z.infer<typeof registerSchema>;
