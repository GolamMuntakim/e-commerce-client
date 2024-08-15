import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Component/Home.jsx';
import MakeCart from './Component/MakeCart.jsx';
import Register from './Auth/Register.jsx';
import Login from './Auth/Login.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element:<PrivateRoute><App></App></PrivateRoute>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/makeCart",
        element:<MakeCart></MakeCart>
      },
      
    ]
  },
  {path : '/register', element:<Register></Register>},
  {path : '/login', element:<Login></Login>},
 
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
   <RouterProvider router={router} />
   <Toaster></Toaster>
   </AuthProvider>
  </StrictMode>,
)
