import React, { useState } from "react";
import Comment from "components/Modal/Comment/Comment.js";
import AudioPlayer from "assets/audioPlayer.js";
import styles from 'components/Modal/Modal.module.scss';

const Modal = (props) =>  {
  const {setShowModal, evidence} = props;

  return (
      <div className={styles.modalContainer}>
        <div className={styles.modal}>

          {/* HEADER */}
          <div className={styles.header}>
            <svg className={styles.header__arrow} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.32623 1L10.2929 1.03317L7.50999 3.8029L12.2929 8.5858V13.5858L17 18.2929L15.5858 19.7071L10.2929 14.4142V9.41423L6.09242 5.21375L3.29291 8L3.32623 1Z" fill="#212529"/>
            </svg>
            <div className={styles.header__source}>Go to source</div>
            <div className={styles.header__buffer}></div>
            <div className={styles.header__lastEditedBy}>{"Last edited by " + evidence.createdBy.firstName + " " + evidence.createdBy.lastName} </div>
            <svg className={styles.header__closeButton} onClick={() => setShowModal(false)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M19 6.4L17.6 5L12 10.6L6.4 5L5 6.4L10.6 12L5 17.6L6.4 19L12 13.4L17.6 19L19 17.6L13.4 12L19 6.4Z" fill="black" fillOpacity="1"/>
            </svg>
          </div>

          {/* BODY */}
          <div className={styles.content}>

            {/* TAGS */}
            <div className={styles.row}>
              <div className={styles.row__label}>
                Tags
              </div>
              <div className={styles.tags}>
                <div className={styles.tags__list}>
                  {evidence.tags.map((tag, index) => {
                    return (
                      <div className={styles.tag} key={tag.id} style={{ background: tag.color }}>
                        {tag.name}
                      </div>
                    );
                  })}
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.32812 17.6719C7.92188 19.2344 9.8125 20.0156 12 20.0156C14.1875 20.0156 16.0625 19.2344 17.625 17.6719C19.2188 16.0781 20.0156 14.1875 20.0156 12C20.0156 9.8125 19.2188 7.9375 17.625 6.375C16.0625 4.78125 14.1875 3.98438 12 3.98438C9.8125 3.98438 7.92188 4.78125 6.32812 6.375C4.76562 7.9375 3.98438 9.8125 3.98438 12C3.98438 14.1875 4.76562 16.0781 6.32812 17.6719ZM4.92188 4.96875C6.89062 3 9.25 2.01562 12 2.01562C14.75 2.01562 17.0938 3 19.0312 4.96875C21 6.90625 21.9844 9.25 21.9844 12C21.9844 14.75 21 17.1094 19.0312 19.0781C17.0938 21.0156 14.75 21.9844 12 21.9844C9.25 21.9844 6.89062 21.0156 4.92188 19.0781C2.98438 17.1094 2.01562 14.75 2.01562 12C2.01562 9.25 2.98438 6.90625 4.92188 4.96875ZM12.9844 6.98438V11.0156H17.0156V12.9844H12.9844V17.0156H11.0156V12.9844H6.98438V11.0156H11.0156V6.98438H12.9844Z" fill="#868E96"/>
                </svg>
              </div>
            </div>

            {/* CONTEXT */}
            <div className={styles.row}>
              <div className={styles.row__label}>
                Context
              </div>
              <div className={styles.context}>
                <AudioPlayer />
                <span className={styles.context__text}>
                  {evidence.context.start + " "}
                  <div className={styles.context__highlight}>
                    {evidence.quote + " "}
                  </div>
                  {evidence.context.end}
                </span>
              </div>
            </div>

            <div className={styles.divider}></div>

            {/* PARTICIPANT */}
            <div className={styles.row}>
              <div className={styles.row__label}>
                Participant
              </div>
              <div className={styles.participant}>
                <div className={styles.participant__column}>
                  {evidence.participant.id}
                </div>
                <div className={styles.participant__column}>
                  <div>Occupation</div>
                  <div>Company Size</div>
                  <div>Note</div>
                </div>
                <div className={styles.participant__column}>
                  <div>{evidence.participant.occupation}</div>
                  <div>{evidence.participant.companySize}</div>
                  <div>{evidence.participant.note}</div>
                </div>
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
                  {evidence.commentThread && evidence.commentThread.map((comment, index) => {
                    return (
                      <Comment member={comment.member} text={comment.text} date={comment.date}/>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Modal;
