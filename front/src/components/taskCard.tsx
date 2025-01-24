import { MoreHoriz } from "@mui/icons-material";
import { Card, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { AlertContext } from "./alertProvider";

function TaskCard({ d, click }: any) {
  const { onDragAction } = useContext(AlertContext);
  return (
    <div draggable onDragCapture={() => onDragAction(d)}>
      <Card key={d._id} className="task-div-card">
        <div className="flex-col-start">
          <div className="task-more-low">
            <span className="low">Low</span>
            <IconButton onClick={(e) => click(e, d)} sx={{ bgcolor: "white" }}>
              <MoreHoriz />
            </IconButton>
          </div>
          <h3>{d.title}</h3>
          <p>{d.description}</p>
        </div>
        <div className="deadline">
          <h6>Deadline: </h6>
          <span>{d.deadline}</span>
        </div>
      </Card>
    </div>
  );
}

export default TaskCard;
