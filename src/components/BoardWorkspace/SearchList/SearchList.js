import React, { useState } from "react";
import Column from 'components/BoardWorkspace/Column/Column.js';
import styles from 'components/BoardWorkspace/SearchList/SearchList.module.scss';

const SearchList = (props) =>  {
  const {column, columnId, updateSourceList} = props;

  return (
      <div className={styles.searchList}>
        <div className={styles.searchList__title}>
          Evidence
        </div>
        <div className={styles.searchBar}>
          <input type="text" id="searchBar" name="searchBar" placeholder="Search for evidence"/>
        </div>
        <Column className={styles.column}
                columnId={columnId}
                column = {column}
        />
      </div>
  );
}

export default SearchList;
