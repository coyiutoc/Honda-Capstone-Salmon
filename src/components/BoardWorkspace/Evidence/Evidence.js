import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "components/BoardWorkspace/Evidence/Evidence.module.scss";

const Evidence = (props) => {
  let { item, index, modalCallback, showMetadata } = props;

  const renderMetadataCard = () => {
    return (
      <div>
        <div className={styles.evidence__header}>
          <div className={styles.evidence__title}>{item.participant.id + " - " + item.participant.occupation}</div>
          <div className={styles.evidence__info} onClick={() => modalCallback(item)}>&#9776;</div>
          <div className={styles.evidence__icon}><div>{item.createdBy.initials}</div></div>
        </div>
        <div className={styles.evidence__quote}>{item.quote}</div>
        {/* <br/> */}

        {/* TAGS */}
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
    )
  }

  const renderSimpleCard = () => {
    return (<div className={styles.evidence__quote}>{item.quote}</div>)
  }

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
              opacity: item.mapped > 0 ? "40%" : "100%",
              backgroundColor: snapshot.isDragging ? "#a6c4e3" : "#F1F3F5",
              border: snapshot.isDragging ? "3px solid #FF6635" : "3px solid white",
              ...provided.draggableProps.style
            }}
          >
            {showMetadata && renderMetadataCard()}
            {!showMetadata && renderSimpleCard()}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Evidence;
