import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { sourceColumn, columnsFromBackend } from 'data/dummyData.js';
import SearchList from 'components/BoardWorkspace/SearchList/SearchList.js';
import Column from 'components/BoardWorkspace/Column/Column.js';
import styles from 'components/BoardWorkspace/BoardWorkspace.module.scss';
<<<<<<< HEAD
import { tags } from 'data/dummyData.js';
import { Evidence } from "data/classes";

=======
>>>>>>> Modal pop up + styling.

// Updates states of all columns after a drag + place has occurred
const updateColumnState = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    let removed = null;
    if (sourceColumn.name !== "Source List") {
      [removed] = sourceItems.splice(source.index, 1);
    } else {
      const copyme = sourceItems[source.index];
      removed = new Evidence(
        copyme.quote,
        copyme.tags,
        copyme.createdBy,
        copyme.source,
        copyme.quoteid
      );
    }
    if (destColumn.name !== "Source List") {
      let existingEvidence = destItems.find(
        (item) => item.quoteid === removed.quoteid
      );
      if (existingEvidence === undefined) {
        destItems.splice(destination.index, 0, removed);
        if (sourceColumn.name === "Source List") {
          sourceItems[source.index].mapped++;
        }
      } else {
        if (sourceColumn.name !== "Source List") {
          const srclistid = Object.entries(columns).find(
            (col) => col[1].name === "Source List"
          )[0];
          const srclist = columns[srclistid].items;
          const srcevid = srclist.findIndex(
            (item) => item.quoteid === removed.quoteid
          );
          columns[srclistid].items[srcevid].mapped--;
          console.log("the other one");
        }
      }
    } else {
      let sourceEvidence = destItems.find(
        (item) => item.quoteid === removed.quoteid
      );
      sourceEvidence.mapped--;
      console.log("this one");
    }
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};


const BoardWorkspace = (props) =>  {
  const modalCallback = props.modalCallback;
  const [columns, setColumns] = useState({...sourceColumn, ...columnsFromBackend});
  const srcKey = Object.entries(sourceColumn)[0][0];
  const srcColState = columns[srcKey];

  return (
    <DragDropContext
      onDragEnd={(result) => updateColumnState(result, columns, setColumns)}
    >
      <div className={styles.boardWorkspace}>
        {/* SEARCH COLUMN */}
        <SearchList columnId = {srcKey} column = {srcColState} modalCallback={modalCallback}/>


        {/* DESTINATION BUCKETS */}
        <div className={styles.boardColumns}>
          {Object.entries(columns).map(([columnId, column], index) => {
            if (columnId !== srcKey) {

              return (  <Column columnId={columnId}
                                column = {column}
                                key={columnId}
                                searchQuery={null}
                                tagFilter={null}
                                modalCallback={modalCallback}
                        />
              );
            }
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default BoardWorkspace;
