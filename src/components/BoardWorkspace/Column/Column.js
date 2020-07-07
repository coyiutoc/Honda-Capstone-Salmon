import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Evidence from 'components/BoardWorkspace/Evidence/Evidence.js';
import styles from 'components/BoardWorkspace/Column/Column.module.scss';

const Column = (props) => {

let {column, columnId} = props;

return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
      key={columnId}
    >
      <div style={{ margin: 8 }}>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className = {styles.column}
                style={{ background: snapshot.isDraggingOver? "lightblue" : "lightgrey"}}
              >
                {column.items.map((item, index) => {
                  return (
                    <Evidence item={item} index={index} key={index}/>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;