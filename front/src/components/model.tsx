import { Add } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Box,
  Button,
  Dialog,
  Divider,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useRef } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

function Model({ open, setOpen, form, variant, setForm, onSubmit }: any) {
  const ref = useRef(null);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setOpen(false);
    onSubmit();
  };
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: "320px", p: "10px 8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "5px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "100%",
                  backgroundColor: "#00ff64",
                }}
              ></div>
              <h3>ADD TASK</h3>
            </div>
            <Add sx={{ fontSize: "12px", color: "#00ff64" }} />
          </div>
          <Divider />
          <form
            onSubmit={(e) => submitHandler(e)}
            style={{
              padding: "5px 8px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingTop: "10px",
            }}
          >
            <Input
              fullWidth
              placeholder="task title"
              name="title"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              value={form?.title}
            />
            <TextField
              fullWidth
              placeholder="task description"
              multiline
              name="description"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              value={form?.description}
              rows={9}
            />
            {form?.progress && (
              <Select
                onChange={(e) => setForm({ ...form, progress: e.target.value })}
                value={form?.progress}
                name="progress"
              >
                <MenuItem value="todo">To do</MenuItem>
                <MenuItem value="onProgress">On Progress</MenuItem>
                <MenuItem value="completed">competed</MenuItem>
              </Select>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button className="date-picker" onClick={() => ref.current}>
                <h5>Deadline</h5>
              </Button>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="picker"
                  ref={ref}
                  name="date"
                  views={["year", "month", "day"]}
                  defaultValue={dayjs(form?.deadline)}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      deadline: dayjs(e).format("DD/MM/YYYY"),
                    })
                  }
                  slotProps={{
                    layout: {
                      sx: {
                        color: "#888",
                        borderRadius: "9px",
                        borderWidth: "1px",
                        borderColor: "#2196f3",
                        border: "1px solid",
                        backgroundColor: "#fff",
                      },
                    },
                  }}
                  label="name"
                />
              </LocalizationProvider>
              <Button type="submit">
                <h5>Assigned to</h5>
              </Button>
            </div>
          </form>
        </Box>
      </Dialog>
    </div>
  );
}

export default Model;
