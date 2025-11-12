import '../styles/globals.css'
import Link from 'next/link'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<nav className='bg-gray-100 p-4 flex gap-4'>
					<Link href='/login'>Login</Link>
					<Link href='/register'>Register</Link>
					<Link href='/profile'>Profile</Link>
				</nav>
				{children}
			</body>
		</html>
	)
}
