import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Dev from "./pages/Dev";
import ErrorPage from "./pages/ErrorPage";
import Niveis from "./pages/Niveis";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/pages/Devs.tsx",
        element: <Dev />,
      },
      {
        path: "/pages/Niveis.tsx",
        element: <Niveis />,
      },
      {
        path: "/pages/About.tsx",
        element: <About />,
      },
    ],
  },
]);

export default function Routes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
