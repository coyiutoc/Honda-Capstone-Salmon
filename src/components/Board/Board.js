import React, {Component} from "react";
import styles from 'components/Board/Board.module.scss';
import TopNavigation from 'components/TopNavigation/TopNavigation.js';
import BoardWorkspace from 'components/BoardWorkspace/BoardWorkspace.js';

const Board = (props) => {

  return (
    <div className={styles.board}>
      <TopNavigation className={styles.header} />
      <BoardWorkspace />
    </div>
  );
}

export default Board;