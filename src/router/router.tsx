import { MainLayout } from "@/layout/MainLayout";
import { MoviePage } from "@/pages/MoviePage";
import { ShowPage } from "@/pages/ShowPage";
import { TheaterPage } from "@/pages/TheaterPage";
import { TicketPage } from "@/pages/TicketPage";
import { UserPage } from "@/pages/UserPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "movie",
        element: <MoviePage />,
      },
      {
        path: "theater",
        element: <TheaterPage />,
      },
      {
        path: "show",
        element: <ShowPage />,
      },
      {
        path: "ticket",
        element: <TicketPage />,
      },
    ],
  },
]);

export { router };
