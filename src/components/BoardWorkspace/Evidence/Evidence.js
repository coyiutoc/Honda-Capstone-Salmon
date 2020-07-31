import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "components/BoardWorkspace/Evidence/Evidence.module.scss";

const Evidence = (props) => {
  let {item, index, modalCallback, showMetadata, searchQuery} = props;
  const [isHovered, setHovered] = useState(false);

  const getHighlightedQuote = () => {
    // If there's a search query, highlight it
    if (searchQuery !== null && searchQuery !== "") {

      function markedText(str) {
        if (str.toLowerCase() === searchQuery.toLowerCase()) {
          return <mark>{str}</mark>;
        } 
        return str;
      }

      const parts = item.quote.split(new RegExp(`(${searchQuery})`, 'gi'));

      return <span> 
              { parts.map((part, i) => 
                  <span key={i}>
                      { markedText(part) }
                  </span>)
              } 
              </span>;
    } else {
      return item.quote;
    }
  }
  
  const renderMetadataCard = () => {
    return (
      <div>
        <div className={styles.evidence__header}>
          <div className={styles.evidence__title}>{item.participant.id + " - " + item.participant.occupation}</div>
          {item.commentThread.length > 0 && 
            <div className={styles.evidence__commentsContainer}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1 0H15C15.5523 0 16 0.447715 16 1V11C16 11.5523 15.5523 12 15 12H9.4141L5.707 15.707C5.42101 15.9929 4.99096 16.0784 4.61735 15.9237C4.24373 15.7689 4.00009 15.4044 4 15V12H1C0.447715 12 0 11.5523 0 11V1C0 0.447715 0.447715 0 1 0ZM9 10H14V2H2V10H5C5.55228 10 6 10.4477 6 11V12.5859L8.293 10.293C8.48045 10.1054 8.73479 9.99998 9 10Z" fill="#868E96"/>
              </svg>
              <div>{item.commentThread.length}</div>
            </div>
          }
          <div className={styles.evidence__icon}><div>{item.createdBy.initials}</div></div>
        </div>
        <div className={styles.evidence__quote}>{getHighlightedQuote()}</div>

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
