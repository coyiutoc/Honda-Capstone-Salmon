import React, {Component} from "react";
import styles from 'components/Board/Board.module.scss';
import TopNavigation from 'components/TopNavigation/TopNavigation.js';
import LeftList from 'components/LeftList/LeftList.js';
import BoardWorkspace from 'components/BoardWorkspace/BoardWorkspace.js';

const Board = (props) => {

  return (
    <div className={styles.board}>
      <TopNavigation className={styles.header} />
      <div className={styles.boardBody}>
        <LeftList />
        <BoardWorkspace />
      </div>
    </div>
  );
}

export default Board;