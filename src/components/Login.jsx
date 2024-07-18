import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login as storeLogin } from "../slices/authSlice"
import { Button, Input, Logo } from '../components/index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()

    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()

                if (userData) {
                    dispatch(storeLogin({userData}));
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="40px" />
                    </span>
                </div>

                <h2 className="text-2xl font-bold mb-8 text-center">Log in to your account</h2>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                
                <form onSubmit={handleSubmit(login)} className="space-y-6">
                    <div>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                    </div>

                    <div>
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full hover:bg-blue-700"
                    >
                        Login
                    </Button>
                </form>

                <p className="mt-4 text-center text-gray-400">
                    Don't have an account?&nbsp;

                    <Link
                        to="/signup"
                        className="text-blue-600 hover:underline hover:text-blue-500"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login