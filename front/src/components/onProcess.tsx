import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import "./todo.css";
import { Delete, Edit } from "@mui/icons-material";
import { AlertContext } from "./alertProvider";
import axios from "../context/axios";
import DialogContent2 from "./dialogContent";
import Model from "./model";
import TaskCard from "./taskCard";
import DragCompo from "./dragCompo";
function OnProcess() {
  const [anchorEl, setAnchorEl] = useState();
  const [open, setOpen] = useState(false);
  const [deleteD, setDeleteD] = useState(false);
  const [modal, setModal] = useState(false);
  const { sendAlert, data, getData } = useContext(AlertContext);
  const [form, setForm] = useState<{ title: any; _id: any }>();
  const [variant, setvariant] = useState("");
  const [success, setSuccess] = useState(false);

  const click = (e: any, d: any) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
    setForm(d);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
    setOpen(false);
  };

  let style = {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    fontSize: "0.9rem",
    gap: "3px",
  };

  const handleEdit = () => {
    handleClose();
    setModal(true);
  };

  const handleDelete = () => {
    handleClose();
    setDeleteD(true);
  };

  const onSubmit = async () => {
    try {
      await axios.put(`/tasks/${form?._id}`, form);
      getData();
      setvariant("updated");
      setSuccess(true);
      setForm(undefined);
    } catch (err: any) {
      sendAlert(err.response.data.message, "error");
    }
  };

  const ondeleted = async () => {
    setDeleteD(false);
    try {
      await axios.delete(`/tasks/${form?._id}`);
      getData();
      setvariant("deleted");
      setSuccess(true);
      setForm(undefined);
    } catch (err: any) {
      sendAlert(err.response.data.message, "error");
    }
  };

  return (
    <section className="task-section">
      <div className="task-header">
        <div style={{ backgroundColor: "#ff9161" }}></div>
        <h3>On Progress</h3>
        <span>{data.onProgress.length}</span>
      </div>
      <Divider sx={{ bgcolor: "#ff9161", height: "2px" }} />
      <div className="task-div">
        <DragCompo index={0} varient="onProgress" />
        {data.onProgress?.map((d: any, i: number) => (
          <>
            <TaskCard d={d} click={click} />
            <DragCompo index={i + 1} varient="onProgress" />
          </>
        ))}

        <Menu
          open={open}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          anchorEl={anchorEl}
          onClose={handleClose}
          style={{ paddingTop: "0", paddingBottom: "0" }}
        >
          <MenuItem onClick={handleEdit} sx={style}>
            <Edit sx={{ fontSize: "15px" }} />
            Edit
          </MenuItem>
          <MenuItem
            onClick={handleDelete}
            style={{ color: "#ff5050" }}
            sx={style}
          >
            <Delete sx={{ fontSize: "15px" }} />
            Delete
          </MenuItem>
        </Menu>
      </div>

      <Dialog open={deleteD} onClose={() => setDeleteD(false)}>
        <DialogTitle>Are You Sure?</DialogTitle>
        <DialogContent sx={{ width: "300px" }}>
          <DialogContentText>
            Are you sure to delete '{form?.title}' ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="success"
            onClick={() => {
              setDeleteD(false);
              setForm(undefined);
            }}
          >
            cancel
          </Button>
          <Button onClick={ondeleted} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Model
        form={form}
        setForm={setForm}
        onSubmit={onSubmit}
        open={modal}
        setOpen={setModal}
      />
      <DialogContent2 open={success} setOpen={setSuccess} variant={variant} />
    </section>
  );
}

export default OnProcess;
