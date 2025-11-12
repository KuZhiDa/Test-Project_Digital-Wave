'use client'

import {
	SubmitHandler,
	UseFormRegister,
	UseFormHandleSubmit,
	FieldErrors,
} from 'react-hook-form'

interface RegisterFormProps {
	onSubmit: SubmitHandler<RegisterFormValues>
	register: UseFormRegister<RegisterFormValues>
	handleSubmit: UseFormHandleSubmit<RegisterFormValues>
	errors: FieldErrors<RegisterFormValues>
}

export interface RegisterFormValues {
	login: string
	email: string
	username: string
	password: string
}

export default function RegisterForm({
	onSubmit,
	register,
	handleSubmit,
	errors,
}: RegisterFormProps) {
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
				{...register('email', {
					required: 'Введите email',
					pattern: { value: /\S+@\S+\.\S+/, message: 'Неверный формат email' },
				})}
				placeholder='Email'
				className='border p-2 rounded'
			/>
			{errors.email && (
				<span className='text-red-500'>{errors.email.message?.toString()}</span>
			)}

			<input
				{...register('username', { required: 'Введите username' })}
				placeholder='Username'
				className='border p-2 rounded'
			/>
			{errors.username && (
				<span className='text-red-500'>
					{errors.username.message?.toString()}
				</span>
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
			{errors.password && (
				<span className='text-red-500'>
					{errors.password.message?.toString()}
				</span>
			)}

			<button type='submit' className='bg-green-500 text-white p-2 rounded'>
				Зарегистрироваться
			</button>
		</form>
	)
}
