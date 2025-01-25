import { Alert, Snackbar } from "@mui/material";
import dayjs from "dayjs";
import React, { createContext, useEffect, useState } from "react";
import axios from "../context/axios";

interface CurrentUserContextType {
  sendAlert: any;
  data: any;
  getData: any;
  onDragAction: any;
  dragCard?: any;
  setData?: any;
  user: User | null;
  getUser: () => Promise<User | null>;
  logoutAction: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
}

export const AlertContext = createContext<CurrentUserContextType>({
  sendAlert: () => {},
  data: {},
  getData: () => {},
  onDragAction: () => {},
  dragCard: null,
  user: null,
  getUser: () => Promise.resolve(null),
  loading: true,
  setLoading: () => {},
  setUser: () => {},
  logoutAction: () => {},
});

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export function AlertProvider(props: any) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState();
  const [data, setData] = useState<any>({
    todo: [],
    onProgress: [],
    completed: [],
    expired: 0,
  });
  const [dragCard, setDragCard] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const sendAlert = (sendMessage: string, type: any) => {
    setMessage(sendMessage);
    setSeverity(type);
    setOpen(true);
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(`/tasks/`); // for development
      // const { data } = await axios.get(`${window.location.origin}/tasks/`); // for production
      setData({
        todo: data.tasks.filter(
          (t: { progress: string }) => t.progress === "todo"
        ),
        onProgress: data.tasks.filter(
          (t: { progress: string }) => t.progress === "onProgress"
        ),
        completed: data.tasks.filter(
          (t: { progress: string }) => t.progress === "completed"
        ),
        expired: data.tasks.filter(
          (t: { deadline: string; progress: string }) => {
            let d = t.deadline.split("/");
            return (
              new Date(`${d[2]} ${d[1]} ${d[0]}`) < new Date(Date.now()) &&
              t.progress !== "completed"
            );
          }
        ),
      });
    } catch (error: any) {
      sendAlert(error.response?.data.message, "error");
    }
  };

  const getUser = async () => {
    if (user) {
      return user;
    }

    try {
      setLoading(true);
      const { data } = await axios.get("/users", { withCredentials: true });
      setUser(data.user);
      getData();
      return data;
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }

    return null;
  };

  const onDragAction = (value: any) => {
    setDragCard(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user) {
      getData();
    }
    // eslint-disable-next-line
  }, [user]);

  async function logoutAction() {
    try {
      setLoading(true);

      const { data } = await axios.get("/users/logout");

      sendAlert(data.message, "success");
      setUser(null);
    } catch (error: any) {
      sendAlert(
        error.response ? error.response.data.message : "Internal Error",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AlertContext.Provider
      value={{
        sendAlert,
        data,
        getData,
        setData,
        onDragAction,
        user,
        setUser,
        getUser,
        loading,
        setLoading,
        dragCard,
        logoutAction,
      }}
    >
      {props.children}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}
