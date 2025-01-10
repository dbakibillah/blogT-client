import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root';
import Home from './pages/Home';
import ThemeProvider from './providers/ThemeProvider';
import AuthProvider from './providers/AuthProviders';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ErrorPage from './pages/ErrorPage';
import AddBlogs from './pages/AddBlogs';
import PrivateRoute from './routes/PrivateRoute';
import AllBlogs from './pages/AllBlogs';
import BlogDetails from './pages/BlogDetails';
import UpdateBlog from './pages/UpdateBlog';
import FeaturedBlogs from './pages/FeaturedBlogs';
import Wishlist from './pages/Wishlist';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/addblogs",
        element: <PrivateRoute><AddBlogs /></PrivateRoute>,
      },
      {
        path: "/allblogs",
        element: <AllBlogs />,
      },
      {
        path: "/blogs/:id",
        element: <PrivateRoute><BlogDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://blog-t-server.vercel.app/blogs/${params.id}`),
      },
      {
        path: "/blogs/update/:id",
        element: <PrivateRoute><UpdateBlog /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://blog-t-server.vercel.app/blogs/${params.id}`),
      },
      {
        path: "/featured",
        element: <FeaturedBlogs />,
      },
      {
        path: "/wishlist",
        element: <PrivateRoute><Wishlist /></PrivateRoute>,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
