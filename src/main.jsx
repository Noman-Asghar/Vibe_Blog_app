import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AuthLayout from "./AuthLayout.jsx"
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Profile from './pages/Profile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
   
      },
      {
        path:"/edit-profile",
        element:<EditProfile />
      },
      {
        path:"/profile",
        element:<Profile />
      },
      {
        path:"/login",
        element: <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      },
      {
        path: "/signup",
        element:<AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      },
      {
        path: "all-posts",
        element:<AuthLayout authentication>
          <AllPosts />
        </AuthLayout>
      },
      {
        path:"add-post",
        element: <AuthLayout authentication>
          {"  "}
          <AddPost />
        </AuthLayout>
      },
      {
        path:"edit-post/:slug",
        element:<AuthLayout>
          <EditPost />
        </AuthLayout>
      },
      {
        path:"post/:slug",
        element:<Post />
      }
    ]

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
