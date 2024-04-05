import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Contacts } from "./contacts/Contacts";
import App from "./App";
import { ErrorPage } from "./contacts/ErrorPage";
import { Home } from "./contacts/Home";
import { Create } from "./contacts/Create";
import { Edit } from "./contacts/Edit";
import { Delete } from "./contacts/Delete";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
