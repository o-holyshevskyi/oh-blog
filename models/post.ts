import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Comment from './comment';

export interface PostProps {
    postData: {
        title: string;
        date: string;
        contentHtml: MDXRemoteSerializeResult;
        tags: string[];
        img: string;
        timeToRead: number;
    };
    relatedPosts: {
        title: string;
        date: string;
        id: string;
        contentHtml: string;
    }[];
    reactions: {
        _id: string;
        postId: string;
        reactions: {
            like: number;
            heart: number;
            fire: number;
            think: number;
        }
    }[];
    comments: Comment[];
}
