'use client'

import { SubmitHandler, UseFormReturn } from 'react-hook-form'

interface LoginFormProps {
	onSubmit: SubmitHandler<LoginFormValues>
	methods: UseFormReturn<LoginFormValues>
}

export interface LoginFormValues {
	login: string
	password: string
}

export default function LoginForm({ onSubmit, methods }: LoginFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = methods

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-4 w-96 mx-auto mt-10'
		>
			<input
				{...register('login', { required: 'Введите логин' })}
				placeholder='Login'
				className='border p-2 rounded'
			/>
			{errors.login && (
				<span className='text-red-500'>{errors.login.message?.toString()}</span>
			)}

			<input
				{...register('password', { required: 'Введите пароль' })}
				type='password'
				placeholder='Password'
				className='border p-2 rounded'
			/>
			{errors.password && (
				<span className='text-red-500'>
					{errors.password.message?.toString()}
				</span>
			)}

			<button type='submit' className='bg-blue-500 text-white p-2 rounded'>
				Войти
			</button>
		</form>
	)
}
