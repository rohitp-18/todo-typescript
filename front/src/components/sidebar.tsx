import {
  AccessTime,
  Add,
  WarningAmber,
  WorkOutline,
} from "@mui/icons-material";
import { Button, Card } from "@mui/material";
import React, { useContext, useState } from "react";
import "./sidebar.css";
import Model from "./model";
import DialogContent from "./dialogContent";
import { AlertContext } from "./alertProvider";
import axios from "axios";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const { sendAlert, data, getData } = useContext(AlertContext);
  const [form, setForm] = useState<{
    title: any;
    description: any;
    deadline: any;
  }>({ title: "", description: "", deadline: "" });

  const onSubmit = async () => {
    try {
      const { data } = await axios.post(`${window.location.origin}/tasks/`, {
        //"http://localhost:5000/tasks/",
        title: form.title,
        description: form.description,
        deadline: form.deadline,
      });
      getData();
      setSuccess(true);
    } catch (err: any) {
      sendAlert(err.response.data.message, "error");
    }
  };

  return (
    <>
      <section className="sidebar">
        <Card className="sidebar-card">
          <WarningAmber sx={{ bgcolor: "#ff3838" }} />
          <div>Expired Tasks</div>
          <h1>{data.expired.length}</h1>
        </Card>
        <Card className="sidebar-card">
          <WorkOutline sx={{ bgcolor: "#ff7f7f" }} />
          <div>All Active Tasks</div>
          <h1>{data.todo.length + data.onProgress.length}</h1>
        </Card>
        <Card className="sidebar-card">
          <AccessTime sx={{ bgcolor: "#6786ff" }} />
          <div>Completed Tasks</div>
          <h1>{data.completed.length}</h1>
        </Card>
        <Button onClick={() => setOpen(true)} className="sidebar-button">
          <Add /> Add Task
        </Button>
      </section>
      <Model
        form={form}
        setForm={setForm}
        onSubmit={onSubmit}
        open={open}
        variant={"created"}
        setOpen={setOpen}
      />
      <DialogContent open={success} setOpen={setSuccess} variant={"created"} />
    </>
  );
}

export default Sidebar;
