'use client'

import { useForm, SubmitHandler } from 'react-hook-form'

interface ProfileFormProps {
	user: any
	onSubmit: SubmitHandler<any>
}

export default function ProfileForm({ user, onSubmit }: ProfileFormProps) {
	const { register, handleSubmit } = useForm({ defaultValues: user })

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
			<input
				{...register('email')}
				placeholder='Email'
				className='border p-2 rounded'
			/>
			<button type='submit' className='bg-green-500 text-white p-2 rounded'>
				Сохранить
			</button>
		</form>
	)
}
