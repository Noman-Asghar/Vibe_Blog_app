import React from 'react'
import authService from '../../appwrite/auth'
import { logout } from '../../redux/slices/auth/authSlice'
import { useDispatch } from 'react-redux'

const LogoutBtn = () => {
    const dispatch = useDispatch()

    const logoutBtnHandler = () => {
        authService.logout()
        .then(() => {dispatch(logout())
    })
    .catch((error) => {
        console.log(error, "logout error");
        
    })
    }
  return (
   <button onClick={logoutBtnHandler} className='bg-blue-400 hover:bg-blue-600 text-white inline-block px-6 py-2 duration-200 rounded-full'>Logout</button>
  )
}

export default LogoutBtn
