import {
    createBrowserRouter,
} from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";

import Layout from "@/pages/Layout";
import Login from "@/pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute><Layout /></AuthRoute>,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

export default router;