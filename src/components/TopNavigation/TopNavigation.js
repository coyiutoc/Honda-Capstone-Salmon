import React, {Component} from "react";
import styles from 'components/TopNavigation/TopNavigation.module.scss';

const TopNavigation = (props) => {

  return (
    <div className={styles.topNavigation}>
      <div className={styles.backButton}>
        Back
      </div>
      <div className={styles.boardTitle}>
        Synthesizing Salmons
      </div>
      <div className={styles.users}>
        Users
      </div>
    </div>
  );
}

export default TopNavigation;