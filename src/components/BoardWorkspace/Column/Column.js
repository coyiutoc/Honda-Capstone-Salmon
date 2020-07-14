import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Evidence from "components/BoardWorkspace/Evidence/Evidence.js";
import styles from "components/BoardWorkspace/Column/Column.module.scss";
import { sourceColumn } from "data/dummyData.js";
import { tags } from "data/dummyData.js";

const Column = (props) => {
  const [starred, toggleStar] = useState(false);
  const [showCards, setShowCards] = useState(true);

  let {column, columnId, searchQuery, tagFilter, showMapped, showUnmapped, modalCallback, showMetadata} = props;
  let srcId = Object.keys(sourceColumn)[0];

  const renderEvidence = () => {
    let list = column.items;

    if (searchQuery !== "" && searchQuery !== null) {
      list = list.filter((evidence) =>
        evidence.quote.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (tagFilter !== null) {
      list = list.filter((evidence) => evidence.hasTag(tags[tagFilter]));
    }

    if (!showMapped) {
      list = list.filter((evidence) => evidence.mapped === 0);
    }

    if (!showUnmapped) {
      list = list.filter((evidence) => evidence.mapped > 0);
    }

    return (list.map((item, index) => {
      return <div className={styles.evidenceContainer} key={index}>
                <Evidence item={item} index={index} modalCallback={modalCallback} showMetadata={showMetadata}/> 
              </div>
    }));

  };

  const handleStarClick = () => {
    toggleStar(!starred);
    column.toggleStar();
  };

  const renderClusterHeader = () => {
    return (<div className={styles.columnTitle}> 
              <input placeholder="Enter cluster name"></input>
              <div className={styles.columnStar} 
                    onClick={() => handleStarClick()}
                    style={{ color: starred ? "#FF6635" : "#CED4DA"}}>
                    &#9733;
              </div>
              <div className={styles.toggleArrow}
                   onClick={() => setShowCards(!showCards)}
                   style={{transform: showCards ? "rotate(180deg)" : "rotate(0deg)"}}>
                &#9650;
              </div>
            </div>);
  }

  return (
    <div
      className={
        columnId === srcId
          ? styles.sourceColumnContainer
          : styles.columnContainer
      }
      key={columnId}
    >
      <Droppable droppableId={columnId} key={columnId}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={
                columnId === srcId ? styles.sourceColumn : styles.column
              }
              style={{
                background: snapshot.isDraggingOver
                  ? "#D3E9FF"
                  : column.items.length > 1
                  ? "white"
                  : "#FFFFFF00",
              }}
            >
              
              {/* COLUMN TITLE */}
              {column.items.length > 1 && columnId !== srcId &&renderClusterHeader()}

              {/* EVIDENCE LIST */}
              {showCards && renderEvidence()}
              {provided.placeholder}

            </div>
            );
          }}
        </Droppable>
      </div>
  );
};

export default Column;
