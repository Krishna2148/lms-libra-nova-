import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import React from 'react'
import { store } from './redux/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Routes } from './routes/routes'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter(Routes);
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
)
