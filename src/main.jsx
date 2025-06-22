    // import { StrictMode } from 'react'
    import { createRoot } from 'react-dom/client'
    import './styles/global.css'
    import { Provider } from 'react-redux';
    import {
      createBrowserRouter,
      RouterProvider,
    } from "react-router-dom";
    import RegisterPage from './pages/client/register.jsx'
    import LoginPage from './pages/client/login.jsx';
    import { store } from './redux/store/store.js'
    import User from './pages/Admin/Users/User.jsx';
    import HomeClient from './pages/client/Home.client.jsx';
    import HomeAdmin from './pages/Admin/Home/Home.admin.jsx'
    import PrivateRoute from './components/Admin/PrivateRoute/PrivateRoute.jsx';
    import AddProduct from './pages/Admin/Uploads/Product/AddProduct.jsx';
    import AddCategory from './pages/Admin/Uploads/Category/AddCategory.jsx';
    const router = createBrowserRouter([
      {
        path: "/",
        element: <HomeClient />,
        children: [

        ],
      },
      {
        path: "/Register",
        element: <RegisterPage />
      },
      {
        path: "/Login",
        element: <LoginPage />
      },
      {
        // Dùng ProtectedRoute bọc toàn bộ các route con admin
        path: "Admin",
        element: <PrivateRoute />,  // Bọc ở đây
        children: [
          {
            path: "home",
            element: <HomeAdmin />
          },
          {
            path: "user",
            element: <User />
          },
          {
            path: "AddProduct",
            element: <AddProduct/>,
          },
          {
            path: "AddCategory",
            element: <AddCategory/>,
          },
        ],
      }
    ]);
    createRoot(document.getElementById('root')).render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
