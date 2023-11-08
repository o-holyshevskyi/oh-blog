import clientPromise from './mongodb';

export async function getComments(id: string) {
    try {
        const client = await clientPromise;
        const db = client.db('posts');
    
        const postId = id;
    
        return db
          .collection('comments')
          .find({ postId })
          .sort({ insertedTime: -1 })
          .toArray();
    
      } catch (error) {
        console.error(error);
    }
}