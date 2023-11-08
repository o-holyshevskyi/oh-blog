import clientPromise from './mongodb';

export async function getReactions(id: string) {
    try {
        const client = await clientPromise;
        const db = client.db('posts');

        const postId = id;

        return db
            .collection('reactions')
            .find({ postId })
            .limit(1)
            .toArray();

    } catch (error) {
        console.error(error);
    }
}