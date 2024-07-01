import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from "../slices/authSlice"
import { Button, Logo, Input } from "./index"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData));
                    navigate("/")
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

                <h2 className="text-2xl font-bold mb-8 text-center">Sign up to create account</h2>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="space-y-6">
                    <div>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                    </div>
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
                        Create Account
                    </Button>
                </form>

                <p className="mt-4 text-center text-gray-400">
                    Already have an account?&nbsp;


                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline hover:text-blue-500"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>

    )
}

export default Signup