import React, { useContext, useState } from "react";
import {
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import {
  AccountCircleOutlined,
  FilterAltOutlined,
  Search,
} from "@mui/icons-material";
import "./navbar.css";
import { AlertContext } from "./alertProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [word, setWord] = useState("");
  const [select, setSelect] = useState("default");
  const [open, setOpen] = useState(false);

  const { user, logoutAction } = useContext(AlertContext);
  const navigate = useNavigate();

  return (
    <nav>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <TextField
          InputProps={{
            startAdornment: <Search sx={{ color: "action.active" }} />,
          }}
          onChange={(e) => setWord(e.target.value)}
          value={word}
          placeholder="search tasks...."
          className="nav-search"
        />
      </Box>
      <Box>
        <FormControl
          className="nav-form-select"
          sx={{ m: 1, bgcolor: "white", minWidth: 120 }}
        >
          <Select
            defaultValue={"default"}
            labelId="label"
            value={"default"}
            label="Age"
          >
            <MenuItem
              sx={{ display: "flex", gap: "5px", alignItems: "center" }}
              defaultChecked
              disabled
              value={"default"}
            >
              <AccountCircleOutlined />
              <span className="span">
                Hi <b>{user?.name}</b>
              </span>
            </MenuItem>
            <MenuItem value="vval">
              <div onClick={() => navigate("/profile")}>View Profile</div>
            </MenuItem>
            <MenuItem onClick={() => setOpen(true)} value="todo">
              Log out
            </MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl
        className="nav-form-select"
        sx={{ m: 1, bgcolor: "white", minWidth: 120 }}
      >
        <Select
          onChange={(e) => setSelect(e.target.value)}
          defaultValue={"default"}
          labelId="label"
          value={select}
          label="Age"
        >
          <MenuItem
            sx={{ display: "flex", gap: "5px", alignItems: "center" }}
            defaultChecked
            disabled
            value={"default"}
          >
            <FilterAltOutlined />
            filter
          </MenuItem>
          <MenuItem value="all">all</MenuItem>
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="progress">On Progress</MenuItem>
          <MenuItem value="complete">Completed</MenuItem>
        </Select>
      </FormControl> */}
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Are You Sure?</DialogTitle>
        <DialogContent sx={{ minWidth: "300px" }}>
          <DialogContentText>Are you sure to logout?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            color="error"
            onClick={() => {
              setOpen(false);
              logoutAction();
            }}
          >
            LogOut
          </Button>
          <Button
            sx={{ textTransform: "capitalize" }}
            onClick={() => setOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
};

export default Navbar;
