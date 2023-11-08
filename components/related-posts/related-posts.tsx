import Link from "next/link";
import utilStyles from '../../styles/utils.module.css';
import Date from "../date/date";
import { timeToRead } from "../../lib/timeToRead";
import { fetchReactionsData } from "../../controller/reactions/reactions";
import { fetchCommentsData } from "../../controller/comments/comments";

export default function RelatedPosts({ relatedPosts, setReactionsData, setCommentList }) {
    const fetchData = async (postId: string) => {
        await fetchReactionsData(postId, setReactionsData);
        await fetchCommentsData(postId, setCommentList);
    }
    
    return (
        <>
            {relatedPosts.length > 0 ? (<h3>
                Related topics
            </h3>) : <></>}
            <div className={utilStyles.cardsContainer}>
            {relatedPosts.map((relatedPost, index) => (
                <div className={utilStyles.card} key={index}>
                <Link 
                    href={`/posts/${relatedPost.id}`}
                    className={`${utilStyles.colorInherit} ${utilStyles.postLink}`}
                    onClick={() => fetchData(relatedPost.id)}
                >
                    <h4>
                    {relatedPost.title}
                    </h4>
                </Link>
                <div className={`${utilStyles.lightText} ${utilStyles.topicInfo}`}>
                    <Date dateString={relatedPost.date} />
                    <div className={utilStyles.separator}></div>
                    <div>{timeToRead(relatedPost.contentHtml)} min read</div>
                </div>
                </div>
            ))}
            </div>
        </>
    );
}
