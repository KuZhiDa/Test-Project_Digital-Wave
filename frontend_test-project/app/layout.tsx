'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const router = useRouter()

	const handleLogout = () => {
		localStorage.removeItem('token')
		router.push('/login')
	}

	return (
		<html lang='en'>
			<body className='bg-gray-50 min-h-screen'>
				<nav className='bg-gray-100 p-4 flex justify-end gap-4'>
					{pathname === '/login' && (
						<Link href='/register' className='text-blue-500 hover:underline'>
							Register
						</Link>
					)}
					{pathname === '/register' && (
						<Link href='/login' className='text-blue-500 hover:underline'>
							Login
						</Link>
					)}
					{pathname === '/profile' && (
						<button
							onClick={handleLogout}
							className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
						>
							Logout
						</button>
					)}
				</nav>
				<main className='p-4'>{children}</main>
			</body>
		</html>
	)
}
