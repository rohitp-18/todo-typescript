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
}

export const AlertContext = createContext<CurrentUserContextType>({
  sendAlert: () => {},
  data: {},
  getData: () => {},
  onDragAction: () => {},
  dragCard: null,
});

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

  const onDragAction = (value: any) => {
    setDragCard(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider
      value={{ sendAlert, data, getData, setData, onDragAction, dragCard }}
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
