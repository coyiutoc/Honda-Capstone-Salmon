import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Evidence from 'components/BoardWorkspace/Evidence/Evidence.js';
import styles from 'components/BoardWorkspace/Column/Column.module.scss';
import { sourceColumn } from 'data/dummyData.js';

const Column = (props) => {

let {column, columnId} = props;
let srcId = Object.keys(sourceColumn)[0];

return (
    <div
      className={columnId === srcId ? styles.sourceColumnContainer : styles.columnContainer}
      key={columnId}
    >
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className = {columnId === srcId ? styles.sourceColumn : styles.column}
                style={{ background: snapshot.isDraggingOver? "#D3E9FF" : "white"}}
              >

                {/* COLUMN TITLE */}
                {column.items.length > 1 && columnId !== srcId &&
                  <div className={styles.columnTitle}> 
                    <input placeholder="Name me please"></input>
                  </div>
                }

                {/* EVIDENCE LIST */}
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
  );
};

export default Column;