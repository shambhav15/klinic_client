import AppointmentForm from "@/components/form/AppointmentForm";
import Image from "next/image";

const Page
    = ({ params: { userId } }: SearchParamProps) => {



        return (
            <div className="flex h-screen max-h-screen">
                <section className="remove-scrollbar relative flex-1 overflow-y-auto px-[5%] my-auto">
                    <div className="mx-auto flex size-full flex-col py-10 max-w-[860px] flex-1 justify-between">
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
                        <AppointmentForm
                            type="create"
                            // userId={userId}
                        />
                        <p className="justify-items-end text-dark-600 xl:text-left">
                            © 2024 Klinic
                        </p>

                    </div>
                </section >

                <Image
                    src="/assets/images/appointment-img.png"
                    height={1000}
                    width={1000}
                    alt="patient"
                    className="hidden h-full object-cover lg:block max-w-[390px] bg-bottom"
                />
            </div >
        );
    };

export default Page
    ;