import React, { useState } from "react";
import AudioPlayer from "assets/audioPlayer.js";
import styles from 'components/Modals/ClusterModal/ClusterModal.module.scss';

const ClusterModal = (props) =>  {
  const {setShowClusterModal, column} = props;

  return (
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          {/* HEADER */}
          <div className={styles.header}>
            <div className={styles.header__buffer}></div>
            <div className={styles.header__lastEditedBy}>{"Last edited by firstname lastnamere here"} </div>
            <svg className={styles.header__closeButton} onClick={() => setShowClusterModal(false)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M19 6.4L17.6 5L12 10.6L6.4 5L5 6.4L10.6 12L5 17.6L6.4 19L12 13.4L17.6 19L19 17.6L13.4 12L19 6.4Z" fill="black" fillOpacity="1"/>
            </svg>
          </div>

        </div>
      </div>
  );
}

export default ClusterModal;
