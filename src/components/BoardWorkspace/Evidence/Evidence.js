import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "components/BoardWorkspace/Evidence/Evidence.module.scss";

const Evidence = (props) => {
<<<<<<< HEAD
  let { item, index, modalCallback, showMetadata } = props;
=======
  let {item, index, modalCallback, showMetadata} = props;
  const [isHovered, setHovered] = useState(false);
>>>>>>> Cluster modal logic.

  const renderMetadataCard = () => {
    return (
      <div>
        <div className={styles.evidence__header}>
          <div className={styles.evidence__title}>{item.participant.id + " - " + item.participant.occupation}</div>
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

  const handleClick = (e) => {
    e.stopPropagation();
    modalCallback(item);
  }

  const handleMouseOver = (e) => {
    e.stopPropagation();
    setHovered(true);
  }

  const handleMouseOut = (e) => {
    e.stopPropagation();
    setHovered(false);
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
              backgroundColor: snapshot.isDragging? "#a6c4e3" : "#F1F3F5",
              cursor: snapshot.isDragging? "grab" : "pointer",
              border: isHovered ? "1px solid #ced4da" : "1px solid white",
              ...provided.draggableProps.style,
            }}
            onClick={(e) => handleClick(e)}
            onMouseOver={(e) => handleMouseOver(e)}
            onMouseOut={(e) => handleMouseOut(e)}
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
