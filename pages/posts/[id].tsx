import Layout from '../../components/layout/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import style from '../../components/layout.module.css';

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
    tags: string[];
    img: string;
  };
}) {
  return (
    <Layout >
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <div className={style.zContainer}>
          {postData.img && (
            <img src={postData.img} alt={postData.title} className={style.postImg}/>
          )}
        </div>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};