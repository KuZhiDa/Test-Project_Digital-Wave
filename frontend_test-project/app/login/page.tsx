'use client'

import AuthForm from '@/components/AuthForm'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
	const router = useRouter()

	const handleLogin = async (data: any) => {
		try {
			const res = await fetch('http://localhost:5000/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
			const json = await res.json()
			console.log(json)
			if (!res.ok) throw new Error(json.message || 'Ошибка входа')

			localStorage.setItem('token', json.token)
			alert(json.message)
			router.push('/profile')
		} catch (err: any) {
			alert(err.message)
		}
	}

	return <AuthForm onSubmit={handleLogin} submitLabel='Войти' />
}
