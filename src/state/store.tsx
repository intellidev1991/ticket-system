import { Movie, Show, Theater, User } from "@/types";
import { Ticket } from "@/types/Ticket";
import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

//===================== Types
type AppProviderProps = {
  children: ReactNode;
};

type AppContextType = {
  notify: NotificationInstance;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[]>>;
  theaters: Theater[];
  setTheaters: Dispatch<SetStateAction<Theater[]>>;
  shows: Show[];
  setShows: Dispatch<SetStateAction<Show[]>>;
  tickets: Ticket[];
  setTickets: Dispatch<SetStateAction<Ticket[]>>;
};

const AppContextDefaultValues: AppContextType = {
  notify: notification,
  users: [],
  setUsers: () => {},
  movies: [],
  setMovies: () => {},
  theaters: [],
  setTheaters: () => {},
  shows: [],
  setShows: () => {},
  tickets: [],
  setTickets: () => {},
};

//===================== API Context
const AppContextObject = createContext<AppContextType>(AppContextDefaultValues);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [notify, contextHolder] = notification.useNotification();

  const [users, setUsers] = useLocalStorage<User[]>("KEY_USERS", []);
  const [movies, setMovies] = useLocalStorage<Movie[]>("KEY_Movies", []);
  const [theaters, setTheaters] = useLocalStorage<Theater[]>(
    "KEY_Theaters",
    []
  );
  const [shows, setShows] = useLocalStorage<Show[]>("KEY_Shows", []);
  const [tickets, setTickets] = useLocalStorage<Ticket[]>("KEY_Tickets", []);

  const value = useMemo(() => {
    return {
      users,
      setUsers,
      movies,
      setMovies,
      theaters,
      setTheaters,
      shows,
      setShows,
      tickets,
      setTickets,
      notify,
    };
  }, [users, movies, theaters, shows, tickets]);

  return (
    <AppContextObject.Provider value={value}>
      <>
        {contextHolder}
        {children}
      </>
    </AppContextObject.Provider>
  );
};

//Custom hook to access App data
const useAppContext = () => {
  return useContext(AppContextObject);
};

export { AppProvider, useAppContext };
