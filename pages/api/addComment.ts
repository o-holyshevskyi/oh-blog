import clientPromise from '../../lib/mongodb';

export default async function addComment(req, res) {
    if (req.method === 'POST') {
        const { postId, text, author, date } = req.body;

        const client = await clientPromise;
        const db = client.db("posts");

        try {
            const insertResult = await db.collection('comments').insertOne(
                {
                    postId,
                    text,
                    author,
                    date,
                    insertedTime: new Date().getTime(),
                    likes: 0,
                    parentId: '0',
                    replies: []
                }
            );

            res.status(201).json({ success: true, result: insertResult.ops[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Unable to insert comment' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}