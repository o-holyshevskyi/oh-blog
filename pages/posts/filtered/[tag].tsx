import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../../components/layout/layout";
import Head from "next/head";
import Date from '../../../components/date/date';
import utilStyles from '../../../styles/utils.module.css';
import { getAllTags, getFilteredPosts } from "../../../lib/posts";
import Link from "next/link";
import { timeToRead } from "../../../lib/timeToRead";

export default function FilteredPosts({
    filteredPosts
}: {
    filteredPosts: {
        date: string;
        title: string;
        tags: string[];
        tag: string;
        id: string;
        contentHtml: string;
    }[]
}) {
    return(
        <Layout>
            <Head>
                <title>All {filteredPosts[0].tag}</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}><span className='cap'>P</span>osts filtered by: <span style={{color: "blue"}}>{filteredPosts[0].tag}</span> ({filteredPosts.length})</h2>
                <ul className={utilStyles.list}>
                {filteredPosts.map(({ id, date, title, tags, contentHtml }) => (
                    <li className={utilStyles.listItem} key={id}>
                    <Link href={`/posts/${id}`} className={utilStyles.postLink}>{title}</Link>
                    <br />
                    <small className={`${utilStyles.lightText} ${utilStyles.topicInfo}`}>
                        <Date dateString={date} />
                        <div className={utilStyles.separator}></div>
                        <div>{timeToRead(contentHtml)} min read</div>
                    </small>
                    <br />
                    <div className={utilStyles.tagsS}>{tags.map((tag, i) => (
                        <div className={utilStyles.tag} key={i}>
                            <div className={utilStyles.tagTextS}>{tag}</div>
                        </div>
                    ))}</div>
                    <div className={utilStyles.delimiter}></div>
                    </li>
                ))}
                </ul>
            </section>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllTags();
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const filteredPosts = await getFilteredPosts(params?.tag as string);
    return {
      props: {
        filteredPosts,
      },
    };
};
