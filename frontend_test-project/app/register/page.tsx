'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import RegisterForm, { RegisterFormValues } from '@/components/RegisterForm'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
	const router = useRouter()
	const methods = useForm<RegisterFormValues>()

	const handleRegister: SubmitHandler<RegisterFormValues> = async data => {
		try {
			const res = await fetch('http://localhost:5000/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
			const json = await res.json()
			if (!res.ok) {
				if (res.status === 400 && typeof json.message === 'object') {
					for (const field in json.message) {
						const firstKey = Object.keys(json.message[field])[0]
						methods.setError(field as keyof RegisterFormValues, {
							type: 'server',
							message: json.message[field][firstKey],
						})
					}
				} else {
					alert(json.message)
				}
				return
			}
			alert(json.message)
			router.push('/login')
		} catch (err: any) {
			alert(err.message || 'Неизвестная ошибка')
		}
	}

	return (
		<RegisterForm
			onSubmit={handleRegister}
			register={methods.register}
			handleSubmit={methods.handleSubmit}
			errors={methods.formState.errors}
		/>
	)
}
