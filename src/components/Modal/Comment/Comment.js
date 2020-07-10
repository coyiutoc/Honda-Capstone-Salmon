import React, { useState } from "react";
import styles from 'components/Modal/Comment/Comment.module.scss';

const Comment = (props) =>  {
  const {member, text, date} = props;

  return (
      <div className={styles.comment}>
        <div className={styles.comment__info}>
          <div className={styles.user}>
            {member.firstName + " " + member.lastName}
          </div>
          <div className={styles.date}>
            {date}
          </div>
        </div>
        <div className={styles.comment__text}>
          {text}
        </div>
      </div>
  );
}

export default Comment;
