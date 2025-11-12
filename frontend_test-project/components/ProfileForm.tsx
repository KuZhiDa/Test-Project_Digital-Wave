'use client'

import { UseFormReturn, SubmitHandler } from 'react-hook-form'

interface ProfileFormProps {
	user: ProfileValues
	methods: UseFormReturn<ProfileValues>
	onSubmit: SubmitHandler<ProfileValues>
}

export interface ProfileValues {
	username: string
	email: string
}

export default function ProfileForm({
	user,
	methods,
	onSubmit,
}: ProfileFormProps) {
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
				{...register('username')}
				placeholder='Username'
				className='border p-2 rounded'
			/>
			{errors.username && (
				<p className='text-red-500'>{errors.username.message?.toString()}</p>
			)}

			<input
				{...register('email')}
				placeholder='Email'
				className='border p-2 rounded'
			/>
			{errors.email && (
				<p className='text-red-500'>{errors.email.message?.toString()}</p>
			)}

			<button
				type='submit'
				className='bg-green-500 text-white p-2 rounded mt-2'
			>
				Сохранить
			</button>
		</form>
	)
}
