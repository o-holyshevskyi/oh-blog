export default interface Comment {
    postId: string;
    text: string;
    author: string;
    date: string;
    insertedTime: number;
    _id: string;
    likes: number;
    replies: Comment[];
}
