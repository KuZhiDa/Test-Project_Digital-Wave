'use client'

import { SubmitHandler, UseFormReturn } from 'react-hook-form'

interface ProfileFormProps {
	user: any
	methods: UseFormReturn<any>
	onSubmit: SubmitHandler<any>
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
			<div>
				<input
					{...register('username')}
					placeholder='Username'
					className='border p-2 rounded w-full'
					defaultValue={user.username}
				/>
				{errors.username?.message && (
					<p className='text-red-500 text-sm'>
						{String(errors.username.message)}
					</p>
				)}
			</div>
			<div>
				<input
					{...register('email')}
					placeholder='Email'
					className='border p-2 rounded w-full'
					defaultValue={user.email}
				/>
				{errors.email?.message && (
					<p className='text-red-500 text-sm'>{String(errors.email.message)}</p>
				)}
			</div>
			<button
				type='submit'
				className='bg-green-500 text-white p-2 rounded mt-2'
			>
				Сохранить
			</button>
		</form>
	)
}
