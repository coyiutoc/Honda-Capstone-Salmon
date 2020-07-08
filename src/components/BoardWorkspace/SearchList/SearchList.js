import React, { useState } from "react";
import Column from 'components/BoardWorkspace/Column/Column.js';
import styles from 'components/BoardWorkspace/SearchList/SearchList.module.scss';
import { tags } from 'data/dummyData.js';

const SearchList = (props) =>  {
  const {column, columnId, updateSourceList} = props;

  return (
      <div className={styles.searchList}>

        {/* TITLE */}
        <div className={styles.searchList__title}>
          Evidence
        </div>

        {/* SEARCH BAR */}
        <div className={styles.searchBar}>
          <input type="text" id="searchBar" name="searchBar" placeholder="Search for evidence"/>
        </div>

        {/* TAGS */}
        <div className={styles.tags}>
          <div className={styles.tags__title}>Filter by</div>
          <div className={styles.tagContainer}>
            {Object.entries(tags).map(([id, data], index) => {
              return (
                <div onClick={() => updateSourceList(id, "TAG")} 
                     className={styles.tag} 
                     key={id} 
                     style={{ background: data.color }}>
                  {data.name}
                </div>
              )
            })}
          </div>
        </div>

        {/* EVIDENCE SOURCE LIST */}
        <Column className={styles.column}
                columnId={columnId}
                column = {column}
        />
      </div>
  );
}

export default SearchList;
