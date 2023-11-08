import React, { useState } from 'react';
import styles from './comment-form.module.css';

export default function CommentForm({ 
    postId, 
    addComment,
    commentList,
    setCommentList,
}) {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim() !== '') {
            await addComment(
                postId, 
                commentText,
                commentList, 
                setCommentList,
            );

            setCommentText('');
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h3>Comments ({commentList.length})</h3>
            <div className={styles.textareaContainer}>
                <textarea
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className={commentText.length > 250 ? `${styles.textareaCommentError} ${styles.textareaComment}` : styles.textareaComment}
                    required={true}
                />
                <div className={commentText.length > 250 ? `${styles.characterCountError} ${styles.characterCount}` : styles.characterCount}>{commentText.length}/250</div>
            </div>
            <button type="submit" className={commentText.length > 250 ? `${styles.submitButtonDisabled} ${styles.submitButton}` : styles.submitButton}>Submit</button>
        </form>       
    );
}
