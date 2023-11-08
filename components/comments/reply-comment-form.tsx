import React, { useState } from 'react';
import styles from './reply-comment-form.module.css';

export default function ReplyCommentForm({
    id,
    postId, 
    parentId,
    replyComment,
    commentList,
    setCommentList,
    onDismissClick
}) {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim() !== '') {
            await replyComment(
                id,
                postId,
                commentText,
                parentId,
                commentList,
                setCommentList
            );

            setCommentText('');
            onDismissClick();
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.replyForm}>
                <div className={styles.textareaContainer}>
                    <textarea
                        placeholder="Reply..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className={commentText.length > 250 ? `${styles.textareaCommentError} ${styles.textareaComment}` : styles.textareaComment}
                        required={true}
                    />
                    <div className={commentText.length > 250 ? `${styles.characterCountError} ${styles.characterCount}` : styles.characterCount}>{commentText.length}/250</div>
                </div>
                <button 
                    type="submit" 
                    className={commentText.length > 250 ? `${styles.replyButtonDisabled} ${styles.replyButton}` : styles.replyButton}
                >Reply</button>
                <button 
                    type="reset" 
                    className={styles.dismissButton}
                    onClick={() => onDismissClick()}
                >Dismiss</button>
            </form>
        </div>
    );
}
