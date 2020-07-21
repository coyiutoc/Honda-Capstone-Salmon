import React, { useState } from "react";
import Comment from "components/Modals/CardModal/Comment/Comment.js";
import styles from 'components/Modals/ClusterModal/ClusterModal.module.scss';
import { getColumnDemographics } from "data/helpers.js"

const ClusterModal = (props) =>  {
  const {setShowClusterModal, column} = props;

  // Helper fxn to count number of unique participants
  const numUnique = (items) => {
    let set = new Set();
    for (let item of items) {
      if (set.has(item.participant)) {continue;}
      set.add(item.participant);
    }
    return set.size;
  }
  
  const columnDemographics = getColumnDemographics(column);

  return (
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          {/* HEADER */}
          <div className={styles.header}>
            <div className={styles.header__title}>{column.text}</div>
            <div className={styles.header__buffer}></div>
            <div className={styles.header__lastEditedBy}>{"Last edited by " + column.items[0].createdBy.firstName + " " + column.items[0].createdBy.lastName} </div>
            <svg className={styles.header__closeButton} onClick={() => setShowClusterModal(false)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M19 6.4L17.6 5L12 10.6L6.4 5L5 6.4L10.6 12L5 17.6L6.4 19L12 13.4L17.6 19L19 17.6L13.4 12L19 6.4Z" fill="black" fillOpacity="1"/>
            </svg>
          </div>

          {/* UNIQUE PARTICIPANTS */}
          <div className={styles.uniqueParticipants}>
            <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5556 7.57895C11.5556 9.55555 9.96368 11.1579 8 11.1579C6.03632 11.1579 4.44444 9.55555 4.44444 7.57895C4.44444 5.60235 6.03632 4 8 4C9.96368 4 11.5556 5.60235 11.5556 7.57895Z" fill="#868E96"/>
              <path d="M4.496e-06 20.1052C1.9394e-05 17.1404 2.38783 14.7368 5.33333 14.7368L10.6667 14.7368C13.6122 14.7368 16 17.1404 16 20.1053V21H0L4.496e-06 20.1052Z" fill="#868E96"/>
            </svg>
            <div className={styles.uniqueParticipants__label}>{numUnique(column.items) + " unique participants"}</div>
          </div>

          {/* FIRST ROW */}
          <div className={styles.row}>
            <div className={styles.block}>
              <div className={styles.block__title}>Gender</div>
              <div className={styles.divider}></div>
              <div className={styles.pieRow}>
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50C100 38.3648 95.9422 27.0939 88.5257 18.1288C81.1091 9.16373 70.7982 3.06586 59.3691 0.885638C47.94 -1.29458 36.1083 0.579367 25.9123 6.18466C15.7163 11.79 7.79438 20.7756 3.51118 31.5938L50 50H100Z" fill="#29509D"/>
                  <path d="M100 50C100 60.559 96.6572 70.8469 90.4509 79.3893C84.2444 87.9316 75.493 94.2899 65.4509 97.5528L50 50H100Z" fill="#FFA386"/>
                  <path d="M65.4509 97.5528C57.9465 99.9911 49.9717 100.619 42.1783 99.3844C34.3849 98.1501 26.9943 95.0888 20.6107 90.4509L50 50L65.4509 97.5528Z" fill="#FFD4C8"/>
                  <path d="M20.6107 90.4509C10.3222 82.9758 3.26863 71.8612 0.885637 59.3691L50 50L20.6107 90.4509Z" fill="#FFF1ED"/>
                  <path d="M0.918641 59.5405C-0.0824924 54.3901 -0.266729 49.1142 0.372693 43.9065L50 50L0.918641 59.5405Z" fill="#C8D2E6"/>
                  <path d="M0.373699 43.8983C0.898375 39.631 1.97127 35.4492 3.56582 31.4564L50 50L0.373699 43.8983Z" fill="#E9EDF5"/>
                </svg>
                <div>
                  {Object.keys(columnDemographics["gender"]).map((key, index) => {
                    return (
                      <div key={index} className={styles.line}>
                        <div className={styles.line__labelSmall}>{key}</div>
                        {columnDemographics["gender"][key] + "%"}
                      </div>   
                    );
                  })}   
                </div>
              </div>   
            </div>
            <div className={styles.block}>
            <div className={styles.block__title}>Age</div>
              <div className={styles.divider}></div>   
              <div className={styles.pieRow}>
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50C100 38.3648 95.9422 27.0939 88.5257 18.1288C81.1091 9.16373 70.7982 3.06586 59.3691 0.885638C47.94 -1.29458 36.1083 0.579367 25.9123 6.18466C15.7163 11.79 7.79438 20.7756 3.51118 31.5938L50 50H100Z" fill="#29509D"/>
                  <path d="M100 50C100 60.559 96.6572 70.8469 90.4509 79.3893C84.2444 87.9316 75.493 94.2899 65.4509 97.5528L50 50H100Z" fill="#FFA386"/>
                  <path d="M65.4509 97.5528C57.9465 99.9911 49.9717 100.619 42.1783 99.3844C34.3849 98.1501 26.9943 95.0888 20.6107 90.4509L50 50L65.4509 97.5528Z" fill="#FFD4C8"/>
                  <path d="M20.6107 90.4509C10.3222 82.9758 3.26863 71.8612 0.885637 59.3691L50 50L20.6107 90.4509Z" fill="#FFF1ED"/>
                  <path d="M0.918641 59.5405C-0.0824924 54.3901 -0.266729 49.1142 0.372693 43.9065L50 50L0.918641 59.5405Z" fill="#C8D2E6"/>
                  <path d="M0.373699 43.8983C0.898375 39.631 1.97127 35.4492 3.56582 31.4564L50 50L0.373699 43.8983Z" fill="#E9EDF5"/>
                </svg>
                <div>
                  {Object.keys(columnDemographics["age"]).map((key, index) => {
                    return (
                      <div key={index} className={styles.line}>
                        <div className={styles.line__labelSmall}>{key}</div>
                        {columnDemographics["age"][key] + "%"}
                      </div>   
                    );
                  })}   
                </div>
              </div>   
            </div>
          </div>

          {/* SECOND ROW */}
          <div className={styles.row}>
            <div className={styles.block}>
              <div className={styles.block__title}>Occupation</div>
              <div className={styles.divider}></div>
              {Object.keys(columnDemographics["occupation"]).map((key, index) => {
                return (
                  <div key={index} className={styles.line}>
                    <div className={styles.line__label}>{key}</div>
                    {columnDemographics["occupation"][key]}
                  </div>   
                );
              })}
            </div>
            <div className={styles.block}>
              <div className={styles.block__title}>Organization Size</div>
              <div className={styles.divider}></div>
              {Object.keys(columnDemographics["companySize"]).map((key, index) => {
                return (
                  <div key={index} className={styles.line}>
                    <div className={styles.line__label}>{key}</div>
                    {columnDemographics["companySize"][key] + "%"}
                  </div>   
                );
              })}   
            </div>
          </div>

          <div className={styles.divider}></div>   

          {/* COMMENTS */}
          <div className={styles.row}>
            <div className={styles.row__label}>
              Comments
            </div>
            <div className={styles.comments}>
              <div className={styles.comments__input}>
                <input type="text" placeholder="Add a comment"></input>
                <div>Post</div>
              </div>
                {column.comments.length > 0 && column.comments.map((comment, index) => {
                  return (
                    <Comment key={index} member={comment.member} text={comment.text} date={comment.date}/>
                  )
                })}
            </div>
          </div>

        </div>
      </div>
  );
}

export default ClusterModal;
