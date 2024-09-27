import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
type ButtonProps = {
    classname?: string,
    isLoading: boolean,
    children: React.ReactNode
}
const SubmitButton = ({ classname, isLoading, children }: ButtonProps) => {
    return (
        <div className='w-full justify-end flex'>
            <Button disabled={isLoading} className={classname ?? "bg-green-500 text-black w-1/2"}>
                {isLoading ? (
                    <div className='flex items-center gap-4'>
                        <Image
                            src="/assets/icons/loader.svg"
                            alt='loader'
                            width={24}
                            height={24}
                            className='animate-spin'
                        />
                        Loading..
                    </div>
                ) : children}
            </Button>
        </div>
    )
}

export default SubmitButton