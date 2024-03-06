import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  cofngirmPassword: z.string().min(6, {
    message: "Confirm Password is required",
  }),
}).refine((data) => data.password === data.cofngirmPassword, {
  message: "Passwords do not match",
  path: ["cofngirmPassword"],
});
