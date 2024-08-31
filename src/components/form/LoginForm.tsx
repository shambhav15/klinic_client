'use client';
import { LoginFormValidation, otpFormValidation } from '@/lib/validationSchema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import { useState, useEffect } from 'react';
import axios from "@/lib/axios";
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useRouter } from 'next/navigation';
import { FormFieldsType } from './RegisterForm';
import Image from 'next/image';
import { useToast } from '../ui/use-toast';
import useUserStore from '@/store/auth';

const LoginForm = () => {
    const { toast } = useToast();
    const { user, fetchUser } = useUserStore();
    const [otpView, setOtpView] = useState(false);
    const router = useRouter();
    const [verified, setVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const form = useForm<z.infer<typeof LoginFormValidation>>({
        resolver: zodResolver(LoginFormValidation),
        defaultValues: {
            phone: "",
        },
    });

    const otpForm = useForm<z.infer<typeof otpFormValidation>>({
        resolver: zodResolver(otpFormValidation),
        defaultValues: {
            otp: "",
            phone: "",
        },
    });

    const sendOtp = async ({ phone }: z.infer<typeof LoginFormValidation>) => {
        try {
            setIsLoading(true);
            const response = await axios.post("/sendOtp", { phone });
            if (response.status === 200) {
                setIsLoading(false);
                setOtpView(true);
                setPhoneNumber(phone);
                otpForm.setValue("phone", phone);
            } else {
                console.log("Could not send Otp. Please try again");
            }
        } catch (error: any) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const verifyOtp = async ({ otp, phone }: z.infer<typeof otpFormValidation>) => {
        try {
            phone = phoneNumber;
            setIsLoading(true);
            const response = await axios.post("/verifyOtp", { phone, otp });
            if (response.status === 200) {
                await fetchUser(); // Ensure the user data is fetched
                const currentUser = useUserStore.getState().user as User; // Check user from Zustand store
                console.log('Current user after fetch:', currentUser); // Log user data
                if (currentUser) {
                    router.push(`/patients/${currentUser._id!}/new-appointment`);
                } else {
                    console.error("User data is not available after fetch");
                }
            }
        } catch (error: any) {
            console.log("error", error);
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast({
                className: "bg-red-600 border-none",
                title: errorMessage,
            });
            setIsLoading(false);
        }
    };

    return (
        <>
            {otpView ? (
                <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(verifyOtp)} className="space-y-6 flex-1">
                        <CustomFormField
                            fieldType={FormFieldsType.OTP}
                            control={otpForm.control}
                            name="otp"
                            label="Enter the Otp"
                            placeholder="Enter the OTP sent to your phone"
                        />
                        <SubmitButton isLoading={isLoading}>Verify OTP</SubmitButton>
                        {verified && (
                            <div className='flex gap-1 items-center'>
                                <p className='text-green-500'>OTP verified successfully</p>
                                <Image src="/assets/icons/check-circle.svg" className='mb-0' alt="check" width={30} height={40} />
                            </div>
                        )}
                    </form>
                </Form>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(sendOtp)} className="space-y-6 flex-1">
                        <Image
                            onClick={() => router.push("/")}
                            src="/assets/icons/arrow.svg"
                            alt="back arrow"
                            width={40}
                            height={40}
                            className='cursor-pointer'
                        />
                        <CustomFormField
                            fieldType={FormFieldsType.PHONE_INPUT}
                            control={form.control}
                            name="phone"
                            label="Phone Number"
                            placeholder="Enter your 10 digit phone number"
                        />
                        <SubmitButton isLoading={isLoading}>
                            Send Otp
                        </SubmitButton>
                    </form>
                </Form>
            )}
        </>
    );
};

export default LoginForm;
