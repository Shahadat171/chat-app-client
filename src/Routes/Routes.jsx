import { createBrowserRouter } from "react-router-dom";
import Chat from "../components/Chat";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../components/Login"
import Register from "../components/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoutes><Chat></Chat></PrivateRoutes>
    },
    {
      path: "/login",
      element: <Login></Login>
    },
    {
      path: "/register",
      element: <Register></Register>
    }
  ]);

export default router