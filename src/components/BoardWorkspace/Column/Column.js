import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Evidence from "components/BoardWorkspace/Evidence/Evidence.js";
import styles from "components/BoardWorkspace/Column/Column.module.scss";
import { sourceColumn } from "data/dummyData.js";
import { tags } from "data/dummyData.js";

const Column = (props) => {
  const [starred, toggleStar] = useState(false);
  const [showCards, setShowCards] = useState(true);
  const headerRef = React.createRef();

  let {column, columnId, searchQuery, tagFilter, showMapped, showUnmapped, modalCallback, showMetadata, setNumShownEvidence} = props;
  let srcId = Object.keys(sourceColumn)[0];

  // Set the column text given was predefined in backend
  useEffect(() => {
    if (headerRef.current && column.text !== undefined) {
      headerRef.current.value = column.text;
    }
  });

  // Helper fxn to count number of unique participants
  const numUnique = (items) => {
    let set = new Set();
    for (let item of items) {
      if (set.has(item.participant)) {continue;}
      set.add(item.participant);
    }
    return set.size;
  }

  // Filters the list of evidence for the source column
  const renderEvidence = () => {

    let list = column.items;

    // Guard - only filter for the source column
    if (columnId === srcId) {
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

      setNumShownEvidence(list.length);
    }

    return (list.map((item, index) => {
      return <div className={styles.evidenceContainer} key={index}>
                <Evidence item={item} index={index} modalCallback={modalCallback} showMetadata={showMetadata}/> 
              </div>
    }));

  };

  // Handles clicking on the star icon
  const handleStarClick = () => {
    toggleStar(!starred);
    column.toggleStar();
  };

  // Helper to adjust textarea height;
  const handleKeyDown = (e) => {

    column.text = e.target.value;
    // Reset field height
    e.target.style.height = '1rem';

    const height = e.target.scrollHeight;
    
    e.target.style.height = `${height}px`;
}

  // Renders the column header HTML
  const renderClusterHeader = () => {
    return (<div className={styles.columnTitle}> 
              <textarea ref={headerRef} 
                        placeholder="Enter cluster name" 
                        onChange={(e) => handleKeyDown(e)}
                        ></textarea>
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
              {column.items.length > 1 && columnId !== srcId && renderClusterHeader()}

              {/* NUM UNIQUE PARTICIPANTS */}
              {column.items.length > 1 && showCards && columnId !== srcId && 
                <div className={styles.numUniqueText}>{numUnique(column.items) + " unique participants"}</div>
              }

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
