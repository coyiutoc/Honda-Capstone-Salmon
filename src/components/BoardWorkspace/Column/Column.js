import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Evidence from "components/BoardWorkspace/Evidence/Evidence.js";
import styles from "components/BoardWorkspace/Column/Column.module.scss";
import { sourceColumn } from "data/dummyData.js";
import { tags } from "data/dummyData.js";

const Column = (props) => {
  const [starred, toggleStar] = useState(false);
  const [showCards, setShowCards] = useState(true);
  const [isHovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({down: {x: null, y: null}, up: {x: null, y: null}})
  const headerRef = React.createRef();

  let {column, columnId, searchQuery, tagFilter, showMapped, showUnmapped, modalCallback, clusterModalCallback, showMetadata, setNumShownEvidence} = props;
  let srcId = Object.keys(sourceColumn)[0];

  // On mount, set the column text given was predefined in backend
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

  // Renders the column header HTML
  const renderClusterHeader = () => {
    return (<div className={styles.columnTitle}> 
              <textarea ref={headerRef} 
                        placeholder="Enter cluster name" 
                        onChange={(e) => handleKeyDown(e)}
                        onClick={(e) => e.stopPropagation()}
                        ></textarea>
              <div className={styles.columnStar} 
                    onClick={(e) => handleStarClick(e)}
                    style={{ color: starred ? "#FF6635" : "#CED4DA"}}>
                    &#9733;
              </div>
              <div className={styles.toggleArrow}
                    onClick={(e) => handleTriangleClick(e)}
                    style={{transform: showCards ? "rotate(180deg)" : "rotate(0deg)"}}>
                &#9650;
              </div>
            </div>);
  }

  // Handles clicking on the star icon
  const handleStarClick = (e) => {
    e.stopPropagation(); // Don't propagate to parent

    toggleStar(!starred);
    column.toggleStar();
  };

  // Handles triangle click to show/hide cards
  const handleTriangleClick = (e) => {
    e.stopPropagation(); // Don't propagate to parent

    setShowCards(!showCards);
  };

  // Helper to adjust textarea height;
  const handleKeyDown = (e) => {
    column.text = e.target.value;
    // Reset field height
    e.target.style.height = '1rem';

    const height = e.target.scrollHeight;
    e.target.style.height = `${height}px`;
  }

  // When click on cluster, open modal
  const handleClusterClick = (e) => {

    // Guard to not handle click on source col
    if (columnId === srcId) {
      return;
    }

    // If it's a drag within the cluster, don't fire callback
    if (mousePosition.down.x !== mousePosition.up.x
        || mousePosition.down.y !== mousePosition.up.y) {
      return;
    }

    e.stopPropagation();
    clusterModalCallback(column);
  }

  // Toggles hover to be on
  const handleMouseOver = (e) => {
    e.stopPropagation();
    setHovered(true);
  }

  // Toggles hover to be off
  const handleMouseOut = (e) => {
    e.stopPropagation();
    setHovered(false);
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
              className={ columnId === srcId ? styles.sourceColumn : styles.column }
              style={{
                background: snapshot.isDraggingOver
                            ? "#D3E9FF"
                            : column.items.length > 1
                            ? "white"
                            : "#FFFFFF00",
                border: columnId !== srcId && isHovered && !snapshot.isDraggingOver && column.items.length > 1 
                            ? "1px solid #ced4da" 
                            : column.items.length > 1 
                            ? "1px solid white"
                            : "none", 
                cursor: isHovered ? "pointer" : "default"
              }}
              onClick={(e) => handleClusterClick(e)}
              onMouseDown={(e) => setMousePosition({...mousePosition, down: {x: e.clientX, y: e.clientY}})}
              onMouseUp={(e) => setMousePosition({...mousePosition, up: {x: e.clientX, y: e.clientY}})}
              onMouseOver={(e) => handleMouseOver(e)}
              onMouseOut={(e) =>handleMouseOut(e)}
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
