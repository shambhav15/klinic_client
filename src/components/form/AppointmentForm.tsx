'use client';
import { AppointmentFormValidation } from '@/lib/validationSchema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import { useEffect, useState } from 'react';
import axios from "@/lib/axios";
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useRouter } from 'next/navigation';
import { FormFieldsType } from './RegisterForm';
import { SelectItem } from '../ui/select';
import useUserStore from '@/store/auth';

type AppointmentFormProps = {
    type: "create" | "cancel";
    // userId: string;
};

const AppointmentForm = ({ type }: AppointmentFormProps) => {

    const router = useRouter();
    const { user , fetchUser } = useUserStore();
    // console.log("user", user);
    if (!user) {
        router.push("/login");
    }

    const [doctors, setDoctors] = useState<Doctors[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hospitals, setHospitals] = useState<Hospital[]>([]);

    const appointmentform = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            // @ts-ignore
            phone: user?.phone || "",
            hospital: "",
            doctor: "",
            // @ts-ignore
            userId: user!._id || "",
            schedule: new Date(Date.now()),
            paid: false,
            reason: "",
        },
    });
    // console.log("appointmentform", appointmentform.control._formValues);

    // Fetch hospitals 
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get("/hospitals");
                setHospitals(response.data.hospitals);
            } catch (error) {
                console.error("Failed to fetch hospitals:", error);
            }
        };
        fetchHospitals();
    }, []);

    const hospitalId = appointmentform.control._formValues.hospital;

    useEffect(() => {
        if (hospitalId) {
            fetchUser();
            const fetchHospitalById = async (hospitalId: string) => {
                try {
                    const response = await axios.get(`/getHospital/${hospitalId}`);
                    // console.log("hospitalById", response.data);
                    const fetchedDoctors = response.data.hospital.doctors.map((d: string) => ({ name: d }));
                    setDoctors(fetchedDoctors); // Store the doctors array
                    console.log("Updated doctors array:", fetchedDoctors);

                } catch (error) {
                    console.log("Failed to fetch hospital by ID:", error);
                }
            };
            fetchHospitalById(hospitalId);

        }
    }, [appointmentform.watch("hospital")]);

    const makeAppointment = async ({ phone, userId, hospital, doctor, paid, reason, schedule }: z.infer<typeof AppointmentFormValidation>) => {
        try {

            setIsLoading(true);
            // console.log("appointmentform", appointmentform);

            const response = await axios.post("/bookAppointment", {
                phone,
                hospital,
                doctor,
                schedule,
                reason,
                paid,
                userId,
            });

            console.log("response", response);
        
            const appointment = response.data.appointment;
            if (response.status === 201) {
                setIsLoading(false);
                if (user) {
                    // @ts-ignore
                    router.push(`/patients/${user!._id}/new-appointment/success?appointmentId=${appointment._id}`);
                }
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to create appointment. Please try again.";
            setIsLoading(false);
        }
    };

    return (
        <>
            <Form {...appointmentform}>
                <form onSubmit={appointmentform.handleSubmit(makeAppointment)} className="space-y-6 flex-1">
                    <section className="mb-12 space-y-4">
                        <h1 className="font-semibold text-2xl">New Appointment</h1>
                        <p className="text-stone-400">Request a new appointment in 10 seconds.</p>
                    </section>
                    {type !== "cancel" && (
                        <>
                            <CustomFormField
                                fieldType={FormFieldsType.SELECT}
                                control={appointmentform.control}
                                name="hospital"
                                label="Hospital"
                                placeholder="Select a hospital"
                            >
                                {hospitals?.map((hospital, i) => (
                                    <SelectItem key={hospital._id + i} value={hospital._id} >
                                        <div className="flex cursor-pointer items-center gap-2">
                                            <p>{hospital.name}</p>
                                        </div>
                                    </SelectItem>
                                ))}
                            </CustomFormField>

                            <CustomFormField
                                fieldType={FormFieldsType.SELECT}
                                control={appointmentform.control}
                                name="doctor"
                                label="Doctor"
                                placeholder="Select yor doctor"
                            >
                                {doctors?.map((doctor, i) => (
                                    <SelectItem key={doctor.name + i} value={doctor.name}>
                                        <div className="flex cursor-pointer items-center gap-2">
                                            <p>{doctor.name}</p>
                                        </div>
                                    </SelectItem>
                                ))}
                            </CustomFormField>
                            <CustomFormField
                                fieldType={FormFieldsType.DATE_PICKER}
                                control={appointmentform.control}
                                name="schedule"
                                label="Expected appointment date"
                                showTimeSelect
                                dateFormat="MM/dd/yyyy  -  h:mm aa"
                            />
                            <CustomFormField
                                fieldType={FormFieldsType.TEXTAREA}
                                control={appointmentform.control}
                                name="reason"
                                label="Reason for appointment"
                                placeholder="Write a brief description of your reason for the appointment"
                            />
                        </>
                    )}
                    <SubmitButton isLoading={isLoading}>Make Appointment</SubmitButton>
                </form>
            </Form >
        </>
    );
};

export default AppointmentForm;
