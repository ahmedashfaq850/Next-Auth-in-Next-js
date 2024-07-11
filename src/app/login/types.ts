import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Please Enter a Email Address")
    .email("Please Enter a valid email address"),
  password: z.string().min(1, "Please Enter a Password"),
});

export type LoginProps = z.infer<typeof loginSchema>;
