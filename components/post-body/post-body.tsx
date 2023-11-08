import { MDXRemote } from 'next-mdx-remote';
import style from '../../components/layout/layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import Date from '../date/date';
import { Pre } from '../pre/pre-component';

const custom = {
    pre: (props) => <Pre {...props}/>
}

export default function PostBody({ postData }) {
    return (
        <div>
            <div className={style.zContainer}>
                {postData.img && (
                    <img src={postData.img} alt={postData.title} className={style.postImg}/>
                )}
            </div>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={`${utilStyles.lightText} ${utilStyles.topicInfo}`}>
                <Date dateString={postData.date} />
                <div className={utilStyles.separator}></div>
                <div>{postData.timeToRead} min read</div>
            </div>
            <div>
                <MDXRemote {...postData.contentHtml} components={{ ...custom }}/>
            </div>
        </div>
    );
}
