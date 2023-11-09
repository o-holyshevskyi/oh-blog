import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function updateRepliedCommentsLike(req, res) {
    if (req.method === 'PUT') {
        const { commentId, replyId } = req.body;

        const client = await clientPromise;
        const db = client.db('posts');

        try {
            const comment = await db.collection('comments').findOne({ _id: ObjectId(commentId) });

            if (!comment) {
                return res.status(404).json({ success: false, error: 'Comment not found' });
            }

            const replyIndex = comment.replies.findIndex(reply => reply._id.toString() === replyId);

            if (replyIndex === -1) {
                return res.status(404).json({ success: false, error: 'Reply not found' });
            }

            comment.replies[replyIndex].likes += 1;

            const updatedResult = await db.collection('comments').updateOne(
                { _id: ObjectId(commentId) },
                {
                  $set: {
                    replies: comment.replies
                  }
                }
            );

            res.status(200).json({ success: true, result: updatedResult });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Unable to update reply likes' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}