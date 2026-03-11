import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Home from "./features/interview/pages/Home";
import ProtectedRoute from "./features/auth/components/protected";
import Interview from "./features/interview/pages/interview";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: 
      <ProtectedRoute>
       <Home/>
      </ProtectedRoute>
  },
  {
    path:"interview/:interviewId",
    element:
      <ProtectedRoute>
        <Interview/>
      </ProtectedRoute> 
  }
]);
