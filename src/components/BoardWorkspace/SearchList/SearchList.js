import React, { useState } from "react";
import Column from 'components/BoardWorkspace/Column/Column.js';
import styles from 'components/BoardWorkspace/SearchList/SearchList.module.scss';
import { tags } from 'data/dummyData.js';

const SearchList = (props) =>  {
  const {column, columnId, modalCallback, showMetadata} = props;
  const [searchQuery, setSearchQuery] = useState(null);
  const [tagFilter, setTagFilter] = useState(null);
  const [showMapped, setMapped] = useState(true);
  const [showUnmapped, setUnmapped] = useState(true);

  var sortedTags = Object.keys(tags).map((key) => [key, tags[key]])
                                    .sort((a,b) => b[1].numEvidence - a[1].numEvidence);

  const handleTagClick = (id) => {
    // Reset filter on same tag click
    if (tagFilter === id) {
      setTagFilter(null);
      return;
    }

    setTagFilter(id);
  }

  const handleMappedClick = (e) => {
    setMapped(e.target.checked ? true : false);
  }

  const handleUnmappedClick = (e) => {
    setUnmapped(e.target.checked ? true : false);
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
            {sortedTags.map(([id, data], index) => {
              return (
                <div onClick={() => handleTagClick(id)} 
                     className={styles.tag} 
                     key={index} 
                     style={{ background: data.color, 
                              outline: tagFilter === id ? "3px solid yellow" : "none",
                              opacity: tagFilter === id ? 1 : 0.4}}>
                    {data.name + " (" + data.numEvidence + ")"}
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.checkboxes}>
          <label htmlFor="mappedCheckbox"> Mapped</label>
          <input type="checkbox" id="mappedCheckbox" name="mappedCheckbox" value="mapped" defaultChecked onClick={(e => handleMappedClick(e))}/>
          <label htmlFor="unmappedCheckbox"> Unmapped</label>
          <input type="checkbox" id="unmappedCheckbox" name="unmappedCheckbox" value="unmapped" defaultChecked onClick={(e => handleUnmappedClick(e))}/>
        </div>

        {/* EVIDENCE SOURCE LIST */}
        <Column 
                columnId={columnId}
                column = {column}
                searchQuery = {searchQuery}
                tagFilter = {tagFilter}
                showMapped = {showMapped}
                showUnmapped = {showUnmapped}
                modalCallback={modalCallback}
                showMetadata={showMetadata}
        />
      </div>
  );
}

export default SearchList;
