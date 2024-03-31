import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContactsPage } from "./contacts/ContactsPage";
import App from "./App";
import { ErrorPage } from "./contacts/ErrorPage";
import { HomePage } from './contacts/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        {
            index: true,
            element: <HomePage />,
          },
      {
        path: "contacts",
        element: <ContactsPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
