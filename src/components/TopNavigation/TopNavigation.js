import React, {Component} from "react";
import styles from 'components/TopNavigation/TopNavigation.module.scss';
import { members } from 'data/dummyData.js';

const TopNavigation = (props) => {
  
  return (
    <div className={styles.topNavigation}>
      <div className={styles.backButton}>
        <svg className={styles.backButton__arrow} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 16L9.4 14.6L3.8 9L16 9L16 7L3.8 7L9.4 1.4L8 -6.99382e-07L6.99382e-07 8L8 16Z" fill="#343A40"/>
        </svg>
        Boards
      </div>
      <div className={styles.boardTitle}>
        Road Trips Synthesis Board
      </div>
      <div className={styles.users}>
        {Object.entries(members).map(([id, member], index) => {
          return (
            <div key={id} className={styles.icon}>
              <div>{member.initials}</div>
            </div>)
        })}
      </div>
    </div>
  );
}

export default TopNavigation;