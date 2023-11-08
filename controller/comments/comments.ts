
import { v4 as uuidv4 } from 'uuid';
import createDate from '../../lib/createDate';

export const addComment = async (
        postId: string, 
        text: string,
        commentList,
        setCommentList
    ) => {
    const userUUID = uuidv4() as string;
    const author = `user_${userUUID.substring(0, 8)}`;
    const date = createDate();

    const response = await fetch('/api/addComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId, text, author, date }),
    });

    if (response.ok) {
      const updatedComments = await response.json();
      commentList.push(updatedComments.result)
      setCommentList(commentList);
      await fetchCommentsData(postId, setCommentList);
    }
};

export const fetchCommentsData = async (postId: string, setCommentList) => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      if (response.ok) {
        const newData = await response.json();
        setCommentList(newData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

export const likeComment = async (
        id: string, 
        postId: string,
        commentList,
        setCommentList
    ) => {
    const response = await fetch('/api/updateCommentLikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      const updatedComments = await response.json();
      commentList.push(updatedComments.result)
      setCommentList(commentList);
      await fetchCommentsData(postId, setCommentList);
    } else {
      console.error('Failed to fetch data');
    }
}
