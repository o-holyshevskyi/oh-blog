import { useState } from 'react';
import styles from './replied-comments.module.css';
import utilStyles from '../../styles/utils.module.css';
import DateTime from '../date/date-time';
import Image from 'next/image';
import ReplyCommentForm from './reply-comment-form';
import { replyComment } from '../../controller/comments/comments';

export default function RepliedComments({
    comment, likeComment, commentList, setCommentList
}) {
    const [hasUserReacted, setHasUserReacted] = useState({});
    const [showCommentForm, setShowCommentForm] = useState(false);

    const { text, author, date, _id, likes, postId} = comment;

    const handleLikeComment = async (id: string) => {
        if (hasUserReacted[id]) {
            return;
        }

        await likeComment(id, postId, commentList, setCommentList);

        setHasUserReacted((prev) => ({ ...prev, [id]: true }));
    }

    return (
        <div>
            <div className={styles.commentWrapper}>
                <div className={styles.verticalLine}>
                    <div className={styles.horizontalLine}></div>
                </div>
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
                <div className={styles.action} onClick={() => setShowCommentForm(!showCommentForm)}>
                    <Image
                        src='/images/reply-arrow.png'
                        width={24}
                        height={24}
                        alt='like'
                    />
                    <div className={styles.text}>Reply</div>
                </div>
            </div>
            {showCommentForm && (
                <ReplyCommentForm
                    id={_id}
                    postId={postId}
                    parentId={_id}
                    replyComment={replyComment}
                    commentList={commentList}
                    setCommentList={setCommentList}
                    onDismissClick={() => setShowCommentForm(!showCommentForm)}
                />
            )}
        </div>
    )
}