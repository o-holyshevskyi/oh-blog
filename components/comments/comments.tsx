import React from 'react';
import styles from './comments.module.css';
import utilStyles from '../../styles/utils.module.css';
import DateTime from '../date/date-time';
import Image from 'next/image';

export default function Comment({ text, author, postId, date }) {
    return (
        <div>
            <div className={styles.commentWrapper}>
                <div className={styles.commentHeader}>
                    <div><strong>{author}</strong></div>
                    <div className={utilStyles.separator}></div>
                    <DateTime dateString={date}></DateTime>
                </div>
                <div className={styles.commentBody}>{text}</div>
            </div>
        </div>
    )
}
