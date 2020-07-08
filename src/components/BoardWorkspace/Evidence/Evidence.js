import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "components/BoardWorkspace/Evidence/Evidence.module.scss";

const Evidence = (props) => {
  let { item, index } = props;

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.evidence}
            style={{
              opacity: item.mapped > 0 ? "20%" : "100%",
              backgroundColor: snapshot.isDragging ? "#a6c4e3" : "#F1F3F5",
              ...provided.draggableProps.style,
            }}
          >
            {item.quote}
            <br></br>
            <div className={styles.tagsContainer}>
              {item.tags.map((tag, index) => {
                return (
                  <div
                    className={styles.tag}
                    key={tag.id}
                    style={{ background: tag.color }}
                  >
                    {tag.name}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Evidence;
