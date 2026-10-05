import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/loginPage";
import SignupPage from "../pages/auth/SignupPage";
import Dashboard from "../pages/dashboard/page";
import CreateQR from "../pages/create-qr/page";
import Details from "../pages/details/page";
import LandingPage from "../pages/landing/page";
import LegalPage from "../pages/legal/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/create-qr",
    element: <CreateQR />,
  },
  {
    path: "/details/:qrId",
    element: <Details />,
  },
  {
    path: "/privacy",
    element: <LegalPage />,
  },
  {
    path: "/terms",
    element: <LegalPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;