import clientPromise from '../../lib/mongodb';

export default async function getReactions(req: any, res: any) {
    try {
        const client = await clientPromise;
        const db = client.db("posts");

        const { postId } = req.query;

        const reactions = await db
            .collection('reactions')
            .find({ postId })
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();

        res.json(reactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

