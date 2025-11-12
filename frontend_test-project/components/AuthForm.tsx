'use client'

import { useForm, SubmitHandler } from 'react-hook-form'

interface AuthFormProps {
	onSubmit: SubmitHandler<RegisterFormValues>
	submitLabel: string
}

interface RegisterFormValues {
	login: string
	email: string
	username: string
	password: string
}

export default function AuthForm({ onSubmit, submitLabel }: AuthFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormValues>()

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
			{errors.login?.message && (
				<span className='text-red-500'>{errors.login.message}</span>
			)}

			<input
				{...register('email', {
					required: 'Введите email',
					pattern: { value: /\S+@\S+\.\S+/, message: 'Неверный формат email' },
				})}
				placeholder='Email'
				className='border p-2 rounded'
			/>
			{errors.email?.message && (
				<span className='text-red-500'>{errors.email.message}</span>
			)}

			<input
				{...register('username', { required: 'Введите username' })}
				placeholder='Username'
				className='border p-2 rounded'
			/>
			{errors.username?.message && (
				<span className='text-red-500'>{errors.username.message}</span>
			)}

			<input
				{...register('password', {
					required: 'Введите пароль',
					minLength: { value: 8, message: 'Минимум 8 символов' },
				})}
				type='password'
				placeholder='Password'
				className='border p-2 rounded'
			/>
			{errors.password?.message && (
				<span className='text-red-500'>{errors.password.message}</span>
			)}

			<button type='submit' className='bg-blue-500 text-white p-2 rounded'>
				{submitLabel}
			</button>
		</form>
	)
}
