import React, { useState } from 'react'
import {Container } from '../../container/Container'
import LogoutBtn from "../Header/LogoutBtn"
import { Link } from 'react-router-dom'
import Logo from '../../Logo'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Bars3Icon } from '@heroicons/react/16/solid'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  // console.log("authStatus in Header:", authStatus)

  const handleNavbarToggle =  () => {
      setOpen(!open)
  }

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  {
      name: "Edit Profile ",
      slug: "/edit-profile",
      active: authStatus,
  },
   {
      name: "Profile ",
      slug: "/profile",
      active: authStatus,
  },
  ]


  return (
    <header className={`py-5 shadow bg-gray-500`}>
      <Container>
         <Bars3Icon className={`w-8 h-8 md:hidden block `} onClick={handleNavbarToggle}/>
        <nav className={`flex md:flex-row flex-col md:opacity-100 md:visible md:max-h-full transition-all duration-300  items-center ${open ? "opacity-100 max-h-[500px] " : "opacity-0 max-h-0"}`}>
         
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex md:flex-row flex-col items-center md:ml-auto ml-0'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-block px-6 font-bold text-white py-2 duration-200 hover:bg-blue-100 hover:text-black md:mr-1.5 mr-0 md:mb-0 mb-2 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header