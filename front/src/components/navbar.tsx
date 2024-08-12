import React, { useContext, useState } from "react";
import { TextField, Box, Select, MenuItem, FormControl } from "@mui/material";
import { FilterAltOutlined, Search } from "@mui/icons-material";
import "./navbar.css";
import { AlertContext } from "./alertProvider";

const Navbar = () => {
  const [word, setWord] = useState("");
  const [select, setSelect] = useState("default");

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
      <FormControl
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
      </FormControl>
    </nav>
  );
};

export default Navbar;
