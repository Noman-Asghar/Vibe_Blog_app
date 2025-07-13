import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from './redux/slices/auth/authSlice'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


function App() {
  const [loading, setLoading] = useState(true)
  // const authStatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

//   if (!loading) {
//   // console.log("App loaded ✅");
// }

return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
) : null;
}
  


export default App
