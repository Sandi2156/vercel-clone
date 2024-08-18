import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import SignUp from "../pages/sign-up";
import SignIn from "../pages/sign-in";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

export default router;
