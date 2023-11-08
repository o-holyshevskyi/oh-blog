import React, { useState } from 'react';
import styles from './comments.module.css';
import utilStyles from '../../styles/utils.module.css';
import DateTime from '../date/date-time';
import Image from 'next/image';

export default function Comment({
     comment, likeComment
    } : { 
        comment: {
            text: string;
            author: string;
            date: string;
            insertedTime: number;
            _id: string;
            likes: number;
            postId: string;
        },
        likeComment: (id: string, postId: string) => Promise<void>
    }) {
    const [hasUserReacted, setHasUserReacted] = useState({});

    const { text, author, date, _id, likes, postId } = comment;

    const handleLikeComment = async (id: string) => {
        if (hasUserReacted[id]) {
            return;
        }

        await likeComment(id, postId);

        setHasUserReacted((prev) => ({ ...prev, [id]: true }));
    }
    
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
            <div className={styles.actions}>
                <div className={styles.action} onClick={() => handleLikeComment(_id)}>
                    <Image
                        src='/images/like.png'
                        width={24}
                        height={24}
                        alt='like'
                    />
                    <div className={styles.text}>{likes} {likes === 0 ? '' : likes > 1 ? 'likes' : 'like'}</div>
                </div>
                <div className={styles.action}>
                    <Image
                        src='/images/reply-arrow.png'
                        width={24}
                        height={24}
                        alt='like'
                    />
                    <div className={styles.text}>Reply</div>
                </div>
            </div>
        </div>
    )
}
