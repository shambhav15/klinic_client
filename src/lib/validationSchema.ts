import { z } from "zod";

export const RegisterFormValidation = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z
    .string()
    .refine((phone) => /^\d{10}$/.test(phone), "Invalid phone number"),
});

export const LoginFormValidation = z.object({
  phone: z
    .string()
    .refine((phone) => /^\d{10}$/.test(phone), "Invalid phone number"),
});

export const otpFormValidation = z.object({
  otp: z.string().refine((otp) => /^\d{6}$/.test(otp), "Invalid OTP"),
  phone: z
    .string()
    .refine((phone) => /^\d{10}$/.test(phone), "Invalid phone number"),
});
