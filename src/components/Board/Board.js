import React, { useState } from "react";
import styles from 'components/Board/Board.module.scss';
import TopNavigation from 'components/TopNavigation/TopNavigation.js';
import BoardWorkspace from 'components/BoardWorkspace/BoardWorkspace.js';
import Modal from 'components/Modals/CardModal/Modal.js';
import ClusterModal from 'components/Modals/ClusterModal/ClusterModal.js';

const Board = (props) => {
  // For card modal
  const [showModal, setShowModal] = useState(false);
  const [payload, setPayload] = useState(null);

  // For cluster modal
  const [showClusterModal, setShowClusterModal] = useState(false);
  const [column, setColumn] = useState(null);

  const handleModalClick = (payload) => {
    setShowModal(true);
    setPayload(payload);
  };

  const handleClusterModalClick = (column) => {
    setShowClusterModal(true);
    setColumn(column);
  }

  return (
    <div className={styles.board}>
      {showClusterModal && <ClusterModal setShowClusterModal={setShowClusterModal} column={column}/>}
      {showModal && <Modal setShowModal={setShowModal} evidence={payload}/>}
      <TopNavigation className={styles.nav} />
      <BoardWorkspace className={styles.body} modalCallback ={handleModalClick} clusterModalCallback={handleClusterModalClick}/>
    </div>
  );
}

export default Board;