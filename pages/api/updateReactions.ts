import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { postId, emoji } = req.body;

        const client = await clientPromise;
        const db = client.db("posts");

        try {
            await db.collection('reactions').updateOne(
                { postId },
                { $inc: { [`reactions.${emoji}`]: 1 } }
            );

            res.status(200).json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Unable to update reactions' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}
