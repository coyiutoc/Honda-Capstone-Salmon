import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "components/BoardWorkspace/Evidence/Evidence.module.scss";

const Evidence = (props) => {
  let {item, index} = props;

  return (
    <Draggable
      key={item.id}
      draggableId={item.id}
      index={index}
    >
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className = {styles.evidence}
            style={{
              backgroundColor: snapshot.isDragging
                ? "#263B4A"
                : "#456C86",
              color: "white",
              ...provided.draggableProps.style
            }}
          >
            {item.content}
          </div>
        );
      }}
    </Draggable>
  );
}

export default Evidence