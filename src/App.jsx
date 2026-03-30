import './App.css';
import { Navigate, RouterProvider, createHashRouter, redirect } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import NotFoundPage from './Components/NotFoundPage/NotFoundPage'
import Categories from './Components/Caregories/Categories'
import Cart from './Components/Cart/Cart'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import AuthContextProvider from './Context/AuthContext'
import AuthProtected from './Components/AuthProtected/AuthProtected'
import ProductDetailes from './Components/ProductDetailes/ProductDetailes'
import { Toaster } from 'react-hot-toast'
import WishListContextProvider from './Context/WishListConteaxt'
import { QueryClient, QueryClientProvider } from 'react-query'
import Profile from './Components/Profile/Profile'
import WishList from './Components/WishList/WishList'
import CartContextProvider from './Context/CartContext'
import FogetPassword from './Components/FogetPassword/FogetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import UserContextProvider from './Context/UserContext'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Allorders from './Components/Allorders/Allorders'
import OnlinePayment from './Components/OnlinePayment/OnlinePayment'

import { lazy, Suspense } from 'react'
import Loader from './Components/Loader/Loader';

// ✅ Lazy Components
const Home = lazy(() => import('./Components/Home/Home'))
const Products = lazy(() => import('./Components/Products/Products'))

// ✅ Wrapper بدل تكرار Suspense
function LazyWrapper({ children }) {
  return (
    <Suspense fallback={<div className="text-center py-5"><Loader/></div>}>
      {children}
    </Suspense>
  )
}

function App() {
  const queryClint = new QueryClient()

  const router = createHashRouter([
    {
      path: ``, element: <Layout />, children: [
        { index: true, loader: () => redirect("home") },

        {
          path: `home`,
          element: (
            <ProtectedRoute>
              <LazyWrapper>
                <Home />
              </LazyWrapper>
            </ProtectedRoute>
          )
        },

        { path: `profile`, element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: `onlinepayment`, element: <ProtectedRoute><OnlinePayment /></ProtectedRoute> },
        { path: `Wishlist`, element: <ProtectedRoute><WishList /></ProtectedRoute> },

        {
          path: `products`,
          element: (
            <ProtectedRoute>
              <LazyWrapper>
                <Products />
              </LazyWrapper>
            </ProtectedRoute>
          )
        },

        { path: `categories`, element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: `cart`, element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: `allorders`, element: <ProtectedRoute><Allorders /></ProtectedRoute> },
        { path: `productDetails/:id`, element: <ProtectedRoute><ProductDetailes /></ProtectedRoute> },

        { path: `regestier`, element: <AuthProtected><Register /></AuthProtected> },
        { path: `login`, element: <AuthProtected><Login /></AuthProtected> },

        { path: `fogetpassword`, element: <FogetPassword /> },
        { path: `verifycode`, element: <VerifyCode /> },
        { path: `ResetPassword`, element: <ResetPassword /> },

        { path: `Fresh-Cart/`, element: <Navigate to={`/Home`} /> },
        { path: `*`, element: <NotFoundPage /> },
      ]
    }
  ])

  return <>
    <UserContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={queryClint}>
          <WishListContextProvider>
            <AuthContextProvider>
              <RouterProvider router={router}></RouterProvider>
            </AuthContextProvider>
          </WishListContextProvider>
        </QueryClientProvider>
      </CartContextProvider>
    </UserContextProvider>

    <Toaster />
  </>
}

export default App;