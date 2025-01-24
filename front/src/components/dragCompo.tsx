import React, { useContext, useState } from "react";
import { AlertContext } from "./alertProvider";

function DragCompo({ varient, index }: { varient: string; index: number }) {
  const [drag, setDrag] = useState(false);

  const { dragCard, onDragAction, data, setData } = useContext(AlertContext);

  function dropAction() {
    console.log(dragCard, varient, index);
    let tempData = { ...data };
    switch (dragCard.progress) {
      case "todo":
        tempData.todo = data.todo.filter((d: any) => d.id !== dragCard.id);
        break;

      case "completed":
        tempData.completed = data.completed.filter(
          (d: any) => d.id !== dragCard.id
        );
        break;

      default:
        tempData.onProgress = data.onProgress.filter(
          (d: any) => d.id !== dragCard.id
        );
        break;
    }

    switch (varient) {
      case "todo":
        tempData.todo.splice(index, 0, {
          ...dragCard,
          progress: varient,
        });
        break;

      case "completed":
        tempData.completed.splice(index, 0, {
          ...dragCard,
          progress: varient,
        });
        break;

      default:
        tempData.onProgress.splice(index, 0, {
          ...dragCard,
          progress: varient,
        });
        break;
    }

    setData(tempData);

    onDragAction(null);
    setDrag(false);
  }
  return (
    <div
      onDragEnter={() => setDrag(true)}
      onDragLeave={() => setDrag(false)}
      style={{ height: "30px" }}
      onDrop={() => dropAction()}
      onDragOver={(e) => e.preventDefault()}
    >
      {drag && "Drag"}
    </div>
  );
}

export default DragCompo;
