import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "./axios";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

interface UserContextType {
  user: User | null;
  getUser: () => Promise<User | null>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
}

let initialUser = {
  user: null,
  getUser: () => Promise.resolve(null),
  loading: true,
  setLoading: () => {},
  setUser: () => {},
};

const UserContext = createContext<UserContextType>(initialUser);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    if (user) {
      return user;
    }

    try {
      setLoading(true);
      const { data } = await axios.get("/users", { withCredentials: true });
      setUser(data);
      return data;
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }

    return null;
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, setLoading, getUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
