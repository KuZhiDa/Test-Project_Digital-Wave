'use client'

import { useEffect, useState } from 'react'
import ProfileForm from '@/components/ProfileForm'

export default function ProfilePage() {
	const [user, setUser] = useState<any>(null)

	useEffect(() => {
		const fetchProfile = async () => {
			const token = localStorage.getItem('token')
			if (!token) return

			try {
				const res = await fetch('http://localhost:3000/auth/profile', {
					headers: { Authorization: `Bearer ${token}` },
				})
				const json = await res.json()
				setUser(json)
			} catch (err) {
				console.error(err)
			}
		}
		fetchProfile()
	}, [])

	const handleUpdate = async (data: any) => {
		const token = localStorage.getItem('token')
		if (!token) return

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
			if (!res.ok) throw new Error(json.message || 'Ошибка обновления')
			alert('Профиль обновлен')
			setUser(json)
		} catch (err: any) {
			alert(err.message)
		}
	}

	if (!user) return <p>Загрузка...</p>

	return <ProfileForm user={user} onSubmit={handleUpdate} />
}
