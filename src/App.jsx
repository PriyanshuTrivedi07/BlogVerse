import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './slices/authSlice'
import { Header, Footer } from "./components/index"
import { Outlet } from 'react-router-dom'

function App() {
	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()

	useEffect(() => {
		authService.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(
						login({ userData })
					)
				} else {
					dispatch(
						logout()
					)
				}
			})
			.catch((error) => {
				if (error.code === 401) {
					dispatch(logout())
				}
			})
			.finally(() => setLoading(false))

	}, [])


	return !loading ? (
		<div className='min-h-screen flex flex-wrap content-between bg-gray-900'>
			<div className='w-full block'>
				<Header />
				<main>
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	) : (
		<div className='text-center'>Loading...</div>
	)
}

export default App
