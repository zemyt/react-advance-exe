import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { EventPage, loader as EventPageLoader } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { CreateEventPage } from "./pages/CreateEventPage";

import { MyContextProvider } from "./context/MyContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "/event/:id",
        element: <EventPage />,
        loader: EventPageLoader,
      },
      {
        path: "/createEvent",
        element: <CreateEventPage />,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <MyContextProvider>
        <RouterProvider router={router} />
      </MyContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
