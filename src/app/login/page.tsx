import LoginForm from '@/components/form/LoginForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <>
            <div className="flex h-screen max-h-screen">
                <section className="remove-scrollbar relative flex-1 overflow-y-auto px-[5%] my-auto">
                    <div className="mx-auto flex size-full flex-col py-10 max-w-[496px]">
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
                        <LoginForm />
                        <div className="text-14-regular mt-20 flex justify-between">
                            <p className="justify-items-end text-dark-600 xl:text-left">
                                © 2024 Klinic
                            </p>
                            <Link href="/?admin=true" className="text-green-500">
                                Admin
                            </Link>
                        </div>
                    </div>
                </section >

                <Image
                    src="/assets/images/register-img.png"
                    height={1000}
                    width={1000}
                    alt="patient"
                    className="hidden h-full object-cover lg:block max-w-[50%]"
                />
            </div >
        </>
    )
}

export default Page