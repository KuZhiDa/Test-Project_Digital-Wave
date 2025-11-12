'use client'

import { useEffect, useState } from 'react'
import ProfileForm from '@/components/ProfileForm'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'

interface ProfileValues {
	username: string
	email: string
}

export default function ProfilePage() {
	const router = useRouter()
	const [user, setUser] = useState<ProfileValues | null>(null)
	const methods = useForm<ProfileValues>()

	useEffect(() => {
		const fetchProfile = async () => {
			const token = localStorage.getItem('token')
			if (!token) {
				router.replace('/login')
				return
			}

			try {
				const res = await fetch('http://localhost:5000/profile', {
					headers: { Authorization: `Bearer ${token}` },
				})

				const json = await res.json()

				console.log(json)

				if (!res.ok) {
					if (res.status === 401 || res.status === 404) {
						localStorage.removeItem('token')
						router.replace('/login')
						return
					}
					alert(json.message || 'Неизвестная ошибка')
					return
				}
				setUser(json)
			} catch (err: any) {
				alert(err.message || 'Ошибка при загрузке профиля')
			}
		}
		fetchProfile()
	}, [router])

	const handleUpdate: SubmitHandler<ProfileValues> = async data => {
		const token = localStorage.getItem('token')
		if (!token) {
			router.replace('/login')
			return
		}

		try {
			const res = await fetch('http://localhost:3000/auth/profile', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			})
			const json = await res.json()

			if (!res.ok) {
				if (res.status === 401 || res.status === 404) {
					localStorage.removeItem('token')
					router.replace('/login')
					return
				}

				if (res.status === 400 && typeof json.message === 'object') {
					for (const field in json.message) {
						const firstKey = Object.keys(json.message[field])[0]
						methods.setError(field as keyof ProfileValues, {
							type: 'server',
							message: String(json.message[field][firstKey]),
						})
					}
					return
				}

				alert(json.message || 'Ошибка обновления профиля')
				return
			}

			setUser(json)
			alert('Профиль обновлен')
		} catch (err: any) {
			alert(err.message || 'Ошибка обновления профиля')
		}
	}

	if (!user) return <p>Загрузка...</p>

	return <ProfileForm user={user} methods={methods} onSubmit={handleUpdate} />
}
