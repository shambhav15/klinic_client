
"use client"
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { useEffect, useState } from "react";

const RequestSuccess = ({
    searchParams,
    params: { userId },
}: SearchParamProps) => {
    console.log("userId", userId);
    const appointmentId = (searchParams?.appointmentId as string) || "";
    console.log("appointmentId", appointmentId);

    const [appointment, setAppointment] = useState<Appointment | null>(null);
    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/getAppointmentById", {
                    params: { appointmentId },
                    withCredentials: true
                });
                const appointment = res.data.appointment;
                console.log("appointment", appointment);
                setAppointment(appointment);
            } catch (error) {
                console.log("Failed to fetch appointment", error);
            }
        };

        fetchAppointment();
    }, []);

    return (
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className="m-auto flex flex-1 flex-col items-center justify-between gap-10 py-10">
                <Link href="/">
                    <div className="flex gap-4 mb-12 items-center">
                        <Image
                            src="/assets/icons/klinic.svg"
                            alt="Logo"
                            width={496}
                            height={496}
                            className="w-fit h-10"
                        />
                        <p className="text-white text-3xl font-semibold">Klinic</p>
                    </div>
                </Link>

                <section className="flex flex-col items-center text-center ">
                    <Image
                        src="/assets/gifs/success.gif"
                        height={300}
                        width={280}
                        alt="success"
                    />
                    <h2 className="text-white mx-3  mb-3 text-center justify-center rounded-lg  px-8 py-6 top-3 sticky text-3xl font-bold flex flex-col z-20 shadow-lg">

                        <span><span>Your</span><span className="text-green-500 ml-2">appointment request</span> has</span>
                        <span>been successfully submitted!</span>
                    </h2>
                    <p className="text-stone-400 text-sm md:text-base">We&apos;ll be in touch shortly to confirm.</p>
                </section>

                <section className="flex w-full flex-col items-center gap-8 border-y-2 border-gray-300 py-8 md:w-fit md:flex-row md:justify-center">
                    <p className="text-stone-500 text-base">Requested appointment details: </p>
                    <div className="flex items-center gap-3">
                        <p className="whitespace-nowrap font-medium text-stone-400">{appointment?.doctor}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Image
                            src="/assets/icons/calendar.svg"
                            height={24}
                            width={24}
                            alt="calendar"
                        />
                        {appointment?.schedule && <p> {formatDateTime(appointment!.schedule).dateTime}</p>}
                    </div>
                </section>

                <Button variant="outline" className=" mt-4" asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment
                    </Link>
                </Button>

                <p className="text-sm text-stone-400 mt-4">© 2024 Klinic</p>
            </div>
        </div>
    );
};

export default RequestSuccess;
