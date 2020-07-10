import React, { useState } from "react";
import styles from 'components/Board/Board.module.scss';
import TopNavigation from 'components/TopNavigation/TopNavigation.js';
import BoardWorkspace from 'components/BoardWorkspace/BoardWorkspace.js';
import Modal from 'components/Modal/Modal.js';

const Board = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [payload, setPayload] = useState(null);

  const handleModalClick = (payload) => {
    setShowModal(true);
    setPayload(payload);
  };

  return (
    <div className={styles.board}>
      {showModal && <Modal setShowModal={setShowModal} evidence={payload}/>}
      <TopNavigation className={styles.nav} />
      <BoardWorkspace className={styles.body} modalCallback ={handleModalClick}/>
    </div>
  );
}

export default Board;