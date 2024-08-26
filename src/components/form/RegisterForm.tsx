'use client'
import { RegisterFormValidation } from '@/lib/validationSchema'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors, isLoading, isValid } } = useForm<z.infer<typeof RegisterFormValidation>>({
        resolver: zodResolver(RegisterFormValidation),
        defaultValues: {
            name: "",
            phone: "",
        },
    })

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input type="text" {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}
                <input type="text" {...register('phone')} />
                {errors.phone && <p>{errors.phone.message}</p>}
            </div>
            <button type="submit">Submit</button>
        </form >
    )
}

export default RegisterForm
