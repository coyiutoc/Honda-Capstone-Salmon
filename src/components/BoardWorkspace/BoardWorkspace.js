import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { sourceColumn, columnsFromBackend } from 'data/dummyData.js';
import SearchList from 'components/BoardWorkspace/SearchList/SearchList.js';
import Column from 'components/BoardWorkspace/Column/Column.js';
import styles from 'components/BoardWorkspace/BoardWorkspace.module.scss';
import { tags } from 'data/dummyData.js';

// Updates states of all columns after a drag + place has occurred
const updateColumnState = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
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
        items: copiedItems
      }
    });
  }
};

const BoardWorkspace = (props) =>  {
  const [columns, setColumns] = useState({...sourceColumn, ...columnsFromBackend});
  const srcKey = Object.entries(sourceColumn)[0][0];
  const srcColState = columns[srcKey];

  return (
    <DragDropContext onDragEnd={result => updateColumnState(result, columns, setColumns)}>
      <div className={styles.boardWorkspace}>

        {/* SEARCH COLUMN */}
        <SearchList columnId = {srcKey} column = {srcColState}/>

        {/* DESTINATION BUCKETS */}
        <div className={styles.boardColumns}>
          {Object.entries(columns).map(([columnId, column], index) => {
            if (columnId !== srcKey) {
              return (  <Column columnId={columnId}
                                column = {column}
                                key={columnId}
                                searchQuery={null}
                                tagFilter={null}
                        />
              );
            }
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

export default BoardWorkspace;
