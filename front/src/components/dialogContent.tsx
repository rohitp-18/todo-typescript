import { Check } from "@mui/icons-material";
import { Button, Dialog } from "@mui/material";
import React from "react";

function DialogContent({ open, setOpen, variant }: any) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="check-icon">
        <Check />
        {variant === "created" && (
          <h3>new Task has been {variant} successfully</h3>
        )}
        {variant !== "created" && <h3>Task has been {variant} successfully</h3>}
        <Button onClick={() => setOpen(false)} variant="contained">
          Back
        </Button>
      </div>
    </Dialog>
  );
}

export default DialogContent;
