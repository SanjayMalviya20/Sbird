
import { lazy, Suspense, useState } from "react"
import Auth from "./components/Auth"
import Home from "./components/Home"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
// import { ToastContainer } from "react-toastify"
import { Toaster } from 'react-hot-toast';
import Bookmarkpost from "./components/Bookmarkpost"
import Premium from "./components/Premium"
// import {} from "react-icons"
function App() {

  const routes = createBrowserRouter([
    {
      path: "/Auth",
      element: <Auth />
    },

    {
      path: "/",
      element: <Home />,

      children:
        [
          {
            path: "/",
            element: <Feed />

          },
          {
            path: "/profile/:id",
            element: <Profile />
          },
          {
            path: "/bookmarkpost/:id",
            element: <Bookmarkpost />
          },

          {
            path: "/premium",
            element: <Premium />
          }
        ]

    }
  ])
  return (
    //outlet component ka use childeren component ko render karne ke liye hota  he
    //navlink ka use kar sakte hai link ki jagah
    <>
      <>
        <Toaster position="bottom-center" toastOptions={{ style: { background: '#2e2e2e', color: '#fff' } }} />
      </>
      <RouterProvider router={routes} />
    </>
  )
}

export default App

