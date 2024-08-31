'use client'
import { RegisterFormValidation } from '@/lib/validationSchema'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../ui/form'
import { useState } from 'react'
import axios from "@/lib/axios"
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { useRouter } from 'next/navigation'
export enum FormFieldsType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    SELECT = "select",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SKELETON = "skeleton",
    OTP = "otp"
}


const RegisterForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof RegisterFormValidation>>({
        resolver: zodResolver(RegisterFormValidation),
        defaultValues: {
            name: "",
            phone: "",
        },
    })

    const onSubmit = async ({ name, phone }: z.infer<typeof RegisterFormValidation>) => {
        try {
            setIsLoading(true);
            const response = await axios.post("/register", {
                phone, name
            });

            if (response.status === 201) {
                setIsLoading(false);
                form.reset({
                    name: "",
                    phone: "",
                });
                router.push("/login");
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="font-semibold text-2xl">Hi there 👋</h1>
                    <p className="text-stone-400">Schedule your first appointment.</p>
                </section>
                <CustomFormField
                    fieldType={FormFieldsType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full Name"
                    placeholder="name"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />
                <CustomFormField
                    fieldType={FormFieldsType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your 10 digit phone number"
                />
                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
                <div>
                    <p>Already registered? <span onClick={() => router.push("/login")} className='text-green-700 cursor-pointer underline underline-offset-2'>Login Here</span></p>
                </div>
            </form>
        </Form >
    )
}

export default RegisterForm;
