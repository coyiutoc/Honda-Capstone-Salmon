import React, { useState } from "react";
import Column from 'components/BoardWorkspace/Column/Column.js';
import styles from 'components/BoardWorkspace/SearchList/SearchList.module.scss';
import { tags } from 'data/dummyData.js';

const SearchList = (props) =>  {
  const {column, columnId} = props;
  const [searchQuery, setSearchQuery] = useState(null);
  const [tagFilter, setTagFilter] = useState(null);

  const handleTagClick = (id) => {
    // Reset filter on same tag click
    if (tagFilter === id) {
      setTagFilter(null);
      return;
    }

    setTagFilter(id);
  }

  return (
      <div className={styles.searchList}>

        {/* TITLE */}
        <div className={styles.searchList__title}>
          Evidence
        </div>

        {/* SEARCH BAR */}
        <div className={styles.searchBar}>
          <input onChange={(e) => setSearchQuery(e.target.value)} type="text" id="searchBar" name="searchBar" placeholder="Search for evidence"/>
        </div>

        {/* TAGS */}
        <div className={styles.tags}>
          <div className={styles.tags__title}>Filter by</div>
          <div className={styles.tagContainer}>
            {Object.entries(tags).map(([id, data], index) => {
              return (
                <div onClick={() => handleTagClick(id)} 
                     className={styles.tag} 
                     key={id} 
                     style={{ background: data.color, 
                              outline: tagFilter === id ? "3px solid yellow" : "none",
                              opacity: tagFilter === id ? 1 : 0.4}}>
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
                searchQuery = {searchQuery}
                tagFilter = {tagFilter}
        />
      </div>
  );
}

export default SearchList;
