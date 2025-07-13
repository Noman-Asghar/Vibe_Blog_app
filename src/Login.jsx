import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from "./redux/slices/auth/authSlice"
import authService from "./appwrite/auth"
import Logo from "./Logo"
import Input from './Input'
import Button from './Button'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const sessions = await authService.login(data)
            if (sessions) {
                 const userData = await authService.getCurrentUser()
                  console.log("UserData after login:", userData);
                 if (userData) dispatch(authLogin(userData))
                   
                    navigate("/")
                 
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
      <div className="mb-2 flex justify-center">
        <span className='inline-block w-full max-w-[100px]'>
            <Logo />
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {
            error && <p className='text-red-600 mt-8 text-center'>{error}</p>
        }
        <form onSubmit={handleSubmit(login)}>
            <div className="space-y-5">
                <Input label="Email: "  type="email"  placeholder={"Enter your email..."} {...register("email", {
                    required: true,
                     validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}/>
                <Input label="Password: " type="password" placeholder="Enter your password" {...register("password", {required: true
                })} />

                <Button type='sumbit' className='w-full'>Sign In</Button>
            </div>
        </form>
      </div>
    </div>
  )
}

export  {Login} 
