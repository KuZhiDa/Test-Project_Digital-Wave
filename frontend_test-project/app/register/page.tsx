'use client'

import AuthForm from '@/components/AuthForm'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
	const router = useRouter()

	const handleRegister = async (data: any) => {
		try {
			const res = await fetch('http://localhost:5000/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
			const json = await res.json()
			if (!res.ok) throw new Error(json.message || 'Ошибка регистрации')
			alert(json.message)
			router.push('/login')
		} catch (err: any) {
			alert(err.message)
		}
	}

	return <AuthForm onSubmit={handleRegister} submitLabel='Зарегистрироваться' />
}
