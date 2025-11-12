'use client'

import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import LoginForm from '@/components/LoginForm'

interface LoginFormValues {
	login: string
	password: string
}

export default function LoginPage() {
	const router = useRouter()
	const methods = useForm<LoginFormValues>()

	const handleLogin: SubmitHandler<LoginFormValues> = async data => {
		try {
			const res = await fetch('http://localhost:5000/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
			const json = await res.json()

			if (!res.ok) {
				if (res.status === 400 && typeof json.message === 'object') {
					for (const field in json.message) {
						const firstKey = Object.keys(json.message[field])[0]
						methods.setError(field as keyof LoginFormValues, {
							type: 'server',
							message: json.message[field][firstKey],
						})
					}
				} else {
					alert(json.message)
				}
				return
			}

			localStorage.setItem('token', json.token)
			router.replace('/profile')
		} catch (err: any) {
			alert(err.message || 'Неизвестная ошибка')
		}
	}

	return <LoginForm onSubmit={handleLogin} methods={methods} />
}
