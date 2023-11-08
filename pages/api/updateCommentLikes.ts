import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
 
export default async function updateCommentsLike(req, res) {
    if (req.method === 'POST') {
        const { id } = req.body;
        const _id = ObjectId(id);

        const client = await clientPromise;
        const db = client.db("posts");

        try {
            const updateResult = await db.collection('comments').updateOne(
                { _id },
                { $inc: { likes: 1 } }
            );

            res.status(200).json({ success: true, result: updateResult });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Unable to update comment like' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}
