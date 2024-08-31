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

export const AppointmentFormValidation = z.object({
  hospital: z.string().min(1),
  doctor: z.string().min(1),
  userId: z.string().min(1),
  phone: z.string().min(1),
  schedule: z.coerce.date(),
  reason: z.string().min(1),
  paid: z.boolean(),
});
