import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from './appwrite/auth'
import { login } from './redux/slices/auth/authSlice'
import Logo from './Logo'
import Input from './Input'
import Button from './Button'

const Signup = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            const createUser = await authService.createAccount(data)
            if (createUser) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (

        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {
                    error && <p className='text-red-600 mt-8 text-center'>{error}</p>
                }
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input label="Full Name: " placeholder="Enter your full name" {...register("name", { required: true })} />
                        <Input label="Email: " type="email" placeholder="Enter your email" {...register("email",
                            {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })} />
            

                        <Input label="Password: " type="password" placeholder="Enter your password" {...register("password", { required: true })} />
                        <Button type='sumbit' className='w-full'>Sign Up</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export  {Signup}
