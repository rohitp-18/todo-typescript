import React, { useContext, useMemo, useState } from "react";
import { AlertContext } from "./alertProvider";
import axios from "../context/axios";
import { height } from "@mui/system";
import { Card } from "@mui/material";

function DragCompo({ varient, index }: { varient: string; index: number }) {
  const [drag, setDrag] = useState(false);

  const { dragCard, onDragAction, data, setData } = useContext(AlertContext);

  async function changeOrder(
    tasks: any[],
    removetask: string,
    progress: string
  ) {
    let tempTasks = tasks.map((task: any) => task._id);
    console.log(tempTasks);
    await axios.put("/tasks/changeorder", {
      tasks: tempTasks,
      removeTask: removetask,
      progress,
    });
  }

  function dropAction() {
    let tempData = { ...data };
    switch (dragCard.progress) {
      case "todo":
        tempData.todo = data.todo.filter((d: any) => d._id !== dragCard._id);
        break;

      case "completed":
        tempData.completed = data.completed.filter(
          (d: any) => d._id !== dragCard._id
        );
        break;

      default:
        tempData.onProgress = data.onProgress.filter(
          (d: any) => d._id !== dragCard._id
        );
        break;
    }

    switch (varient) {
      case "todo":
        tempData.todo.splice(index, 0, {
          ...dragCard,
          progress: varient,
        });
        changeOrder(tempData.todo, dragCard._id, "todo");
        break;

      case "completed":
        tempData.completed.splice(index, 0, {
          ...dragCard,
          progress: varient,
        });
        changeOrder(tempData.completed, dragCard._id, "completed");
        break;

      default:
        tempData.onProgress.splice(index, 0, {
          ...dragCard,
          progress: varient,
        });
        changeOrder(tempData.onProgress, dragCard._id, "onProgress");
        break;
    }

    setData(tempData);

    onDragAction(null);
    setDrag(false);
  }

  let style = useMemo(() => {
    if (index === data[varient].length) {
      return {
        display: "flex",
        flex: 1,
        height: "unset",
      };
    } else {
      return {};
    }
  }, [data, index, varient]);
  return (
    <div
      onDragEnter={() => setDrag(true)}
      onDragLeave={() => setDrag(false)}
      style={{ height: drag ? "unset" : "15px", ...style }}
      onDrop={() => dropAction()}
      onDragOver={(e) => e.preventDefault()}
    >
      {drag && (
        <Card
          style={{
            margin: "15px 0",
            zIndex: 2,
            backgroundColor: "##ffffdf",
            border: "1px solid #ccd186",
            placeContent: "center",
          }}
          className="task-div-card"
        >
          <div
            style={{ color: "grey", fontSize: "19px", alignItems: "center" }}
            className="flex-col-start"
          >
            DROP HERE
          </div>
        </Card>
      )}
    </div>
  );
}

export default DragCompo;
