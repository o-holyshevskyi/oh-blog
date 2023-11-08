import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';

export default function PostTags({ postData }) {
    return (
        <div className={utilStyles.tagsL}>{postData.tags.map((tag, i) => (
            <div className={utilStyles.tagL} key={i}>
              <Link 
                href={`/posts/filtered/${tag.replace('#', '').toLowerCase()}`}
                className={utilStyles.colorInherit}
              >
                <div className={utilStyles.tagTextL}>{tag}</div>
              </Link>
            </div>
        ))}</div>
    );
}
