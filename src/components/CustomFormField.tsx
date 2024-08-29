"use client"
import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Control, Form } from 'react-hook-form'
import Image from 'next/image'
import { Input } from './ui/input'
import { FormFieldsType } from './form/RegisterForm'
import { Phone } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './ui/input-otp'


type CustomProps = {
    control: Control<any>,
    fieldType: FormFieldsType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode
    renderSkleton?: (field: any) => React.ReactNode,
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {

    const { iconAlt, iconSrc, placeholder } = props


    switch (props.fieldType) {
        case FormFieldsType.INPUT:
            return (
                <div className='flex rounded-lg border-stone-700 h-10 border'>
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || 'icon'}
                            width={24}
                            height={24}
                            className='ml-2 text-stone-700'
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className='focus-visible:ring-0 border-none focus-visible:ring-offset-0'
                        />
                    </FormControl>
                </div>
            )
            break;

        case FormFieldsType.PHONE_INPUT:
            return (
                <FormControl>
                    <div className='flex items-center border h-10 border-stone-700 rounded-lg'>
                        <div className='flex w-3/12 items-center'>
                            <Phone className='w-1/3 ml-1 dark:text-[#CDE9DF] text-stone-700' size={25} />
                            <Input
                                placeholder='+91'
                                className='border-0 w-2/3'
                                disabled
                            />
                        </div>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            className='placeholder:text-gray-400 w-9/12 rounded-md text-sm focus-visible:ring-0 border-none focus-visible:ring-offset-0'
                        />
                    </div>
                </FormControl>
            )
            break;
        case FormFieldsType.OTP:
            return (
                <div>
                    <InputOTP maxLength={6} {...field} value={field.value} onChange={field.onChange}>
                        <InputOTPGroup >
                            <InputOTPSlot className='border border-stone-500' index={0} />
                            <InputOTPSlot className='border border-stone-500' index={1} />
                            <InputOTPSlot className='border border-stone-500' index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot className='border border-stone-500' index={3} />
                            <InputOTPSlot className='border border-stone-500' index={4} />
                            <InputOTPSlot className='border border-stone-500' index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
            )
        default:
            break;
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, name, label, fieldType, } = props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldType != FormFieldsType.CHECKBOX && label && (
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                    )}

                    <RenderField field={field} props={props} />

                    <FormMessage className='text-red-500' />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField