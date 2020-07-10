import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Evidence from 'components/BoardWorkspace/Evidence/Evidence.js';
import styles from 'components/BoardWorkspace/Column/Column.module.scss';
import { sourceColumn } from 'data/dummyData.js';
import { tags } from 'data/dummyData.js';

const Column = (props) => {

let {column, columnId, searchQuery, tagFilter, modalCallback} = props;
let srcId = Object.keys(sourceColumn)[0];

const renderEvidence = () => {
  let list = column.items;

  if (searchQuery !== "" && searchQuery !== null) {
    list = list.filter(evidence => evidence.quote.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (tagFilter !== null) {
    list = list.filter(evidence => evidence.hasTag(tags[tagFilter]));
  }

  return (list.map((item, index) => {
    return <Evidence item={item} index={index} key={index} modalCallback={modalCallback}/> 
  }));

};

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
                    <input placeholder="Enter cluster name"></input>
                  </div>
                }

                {/* EVIDENCE LIST */}
                {renderEvidence()}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
  );
};

export default Column;