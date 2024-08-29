'use client';
import { LoginFormValidation, otpFormValidation } from '@/lib/validationSchema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import { useState } from 'react';
import axios from "axios";
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useRouter } from 'next/navigation';
import { FormFieldsType } from './RegisterForm';
import Image from 'next/image';
import { useToast } from '../ui/use-toast';
import { useAuthStore } from '@/store/auth';


const LoginForm = () => {
    const { setToken, setUser } = useAuthStore.getState();
    const { toast } = useToast();
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

    const handleLogin = async ({ phone }: z.infer<typeof LoginFormValidation>) => {
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:8000/api/users/sendOtp", { phone });
            if (response.status === 200) {
                console.log(response.data);
                setIsLoading(false);
                setOtpView(true);
                setPhoneNumber(phone);
                otpForm.setValue("phone", phone);

            } else {
                // toast.error("Could not send Otp. Please try again");
                console.log("Could not send Otp. Please try again");
            }
        } catch (error: any) {
            setIsLoading(false);
            console.log(error);
        }
    };

    // const verifyOtp = async ({ otp, phone }: z.infer<typeof otpFormValidation>) => {
    //     // Access Zustand actions

    //     try {
    //         phone = phoneNumber;
    //         setIsLoading(true);
    //         const response = await axios.post("http://localhost:8000/api/users/verifyOtp", {
    //             phone,
    //             otp,
    //         }, {
    //             withCredentials: true,
    //         });

    //         console.log("response", response);

    //         if (response.status === 200) {
    //             console.log("response verify", response.data);
    //             setToken(response.data.accessToken);  // Store token in Zustand


    //             setIsLoading(false);
    //             setVerified(true);
    //             router.push("/main");
    //         }
    //     } catch (error: any) {
    //         console.log("error", error);

    //         const errorMessage = error.response?.data?.message || "Something went wrong";
    //         toast({
    //             className: "bg-red-600 border-none",
    //             title: errorMessage,
    //         });
    //         setIsLoading(false);
    //     }
    // };
    const verifyOtp = async ({ otp, phone }: z.infer<typeof otpFormValidation>) => {
        try {
            phone = phoneNumber;
            setIsLoading(true);
            const response = await axios.post("http://localhost:8000/api/users/verifyOtp", {
                phone,
                otp,
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                const { accessToken } = response.data;
                // Set the token in Zustand store
                useAuthStore.getState().setToken(accessToken);
                setIsLoading(false);
                setVerified(true);
                router.push("/main");
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
            {
                otpView ? (
                    <>
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
                                        <p className='text-green-500'>otp verified successfully</p>
                                        <Image src="/assets/icons/check-circle.svg" className='mb-0' alt="check" width={30} height={40} />
                                    </div>
                                )}
                            </form>
                        </Form>
                    </>
                ) : (
                    <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6 flex-1">
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
                        <div onClick={() => setOtpView(!otpView)}>otp</div>
                    </>
                )
            }
        </>
    );
};

export default LoginForm;