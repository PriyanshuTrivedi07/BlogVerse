import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './slices/authSlice'
import { Header, Footer } from "./components/index"
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
				transition:Bounce
			/>
		</div>
	) : (
		<div className='text-center'>Loading...</div>
	)
}

export default App
