import Head from 'next/head';
import Layout, { name } from '../components/layout/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date/date';
import { GetStaticProps } from 'next';
import { timeToRead } from '../lib/timeToRead';

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    tags: string[];
    id: string;
    contentHtml: string;
  }[];
}) {

  const sortedPostData = allPostsData.slice(0, 5);

  return (
    <Layout home>
      <Head>
        <title>{name}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, my name is Oleksandr. I'm a certificated Test Automation Engineer based in Ukraine. 
          I am dedicated to improving the experiences of both people and customers alike, using my skills 
          to deliver top-notch results that drive success.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}><span className='cap'>R</span>ecent posts</h2>
        <ul className={utilStyles.list}>
          {sortedPostData.map(({ id, date, title, tags, contentHtml }) => (
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
                  <div className={utilStyles.tagS} key={i}>
                      <Link 
                        href={`/posts/filtered/${tag.replace('#', '').toLowerCase()}`}
                        className={utilStyles.colorInherit}
                      >
                        <div className={utilStyles.tagTextS}>{tag}</div>
                      </Link>
                  </div>
              ))}</div>
              <div className={utilStyles.delimiter}></div>
            </li>
          ))}
        </ul>
      </section>
      <div className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${utilStyles.content}`}>
        <Link href={`/posts/all-posts`}>
          <button className={utilStyles.morePosts}>
            <strong>More Posts</strong>
          </button>
        </Link>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};