import React, { useEffect, useState } from 'react';
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
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        const handleBodyScroll = () => {
          document.body.style.overflow = isPopupOpen ? 'hidden' : 'auto';
        };
    
        handleBodyScroll();
    
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, [isPopupOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim() !== '') {
            setPopupOpen(true);
        }
    }

    const handleSend = async () => {
        if (name.length === 0) {
            setPopupOpen(true);
            return;
        }
        await replyComment(
            id,
            postId,
            name,
            commentText,
            parentId,
            commentList,
            setCommentList
        );
        setCommentText('');
        setName('');
        setPopupOpen(false);
        onDismissClick();
    }

    const handleDismiss = () => {
        setName('');
        setPopupOpen(false);
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
                {isPopupOpen && (
                    <div>
                        <div className={styles.overlay}></div>
                        <div className={styles.popup}>
                            <div className={styles.header}>
                                <div>Enter your name</div>
                            </div>
                            <input 
                                type="text"
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                                maxLength={50}
                            />
                            <div>
                                <button onClick={handleSend} className={styles.send}>Send</button>
                                <button onClick={handleDismiss} className={styles.dismiss}>Dismiss</button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
