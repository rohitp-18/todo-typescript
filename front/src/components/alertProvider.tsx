import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import React, { createContext, useEffect, useState } from "react";

interface CurrentUserContextType {
  sendAlert: any;
  data: any;
  getData: any;
}

export const AlertContext = createContext<CurrentUserContextType>({
  sendAlert: () => {},
  data: {},
  getData: () => {},
});

export function AlertProvider(props: any) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState();
  const [data, setData] = useState({
    todo: [],
    onProgress: [],
    completed: [],
    expired: 0,
  });

  const sendAlert = (sendMessage: string, type: any) => {
    setMessage(sendMessage);
    setSeverity(type);
    setOpen(true);
  };

  const getData = async () => {
    try {
      // const { data } = await axios.get(`http://localhost:5000/tasks/`);
      const { data } = await axios.get(`${window.location.origin}/tasks/`);
      // let date = dayjs(new Date(Date.now())).format("DD/MM/YYYY");
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
              t.progress != "completed"
            );
          }
        ),
      });
    } catch (error: any) {
      // sendAlert(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ sendAlert, data, getData }}>
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
