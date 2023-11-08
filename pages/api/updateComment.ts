import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function updateComment(req, res) {
    if (req.method = 'PUT') {
        const { _id, postId, text, author, date, parentId } = req.body;

        const client = await clientPromise;
        const db = client.db('posts');

        try {
            const comment = await db.collection('comments').findOne({ _id: ObjectId(_id) });

            const replyComment = {
                _id: ObjectId(),
                postId,
                text,
                author,
                date,
                insertedTime: new Date().getTime(),
                likes: 0,
                parentId: _id, 
                replies: []
            };

            comment.replies.push(replyComment);
            if (!comment) {
                return res.status(404).json({ success: false, error: 'Comment not found' });
            } else {
                await db.collection('comments').updateOne(
                    { _id: ObjectId(_id) },
                    {                        
                        $set: {
                            replies: comment.replies,
                        }
                    }
                );
            }

            res.status(200).json({ success: true, message: 'Comment updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Unable to update comment' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}
