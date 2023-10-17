import Layout from '../../components/layout/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import style from '../../components/layout/layout.module.css';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import rehypePrism from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';
import { postProcess, preProcess } from '../../lib/rehype-pre-raw';
import { Pre } from '../../components/pre/pre-component';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';

const custom = {
  pre: (props) => <Pre {...props}/>
}

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: MDXRemoteSerializeResult;
    tags: string[];
    img: string;
  };
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('progress', {
      value: 100,
      scrollTrigger: {
        scrub: 0.5,
      }
    });
  }, []);

  return (
    <Layout >
      <Head>
        <meta name="image" ref={postData.img} />
        <title>{postData.title}</title>
      </Head>
      <progress max={100} value={0} className={utilStyles.progress}></progress>
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
        <div>
          <MDXRemote {...postData.contentHtml} components={{ ...custom }}/>
        </div>
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

  const html = await serialize(postData.contentHtml, { mdxOptions: {
    rehypePlugins: [
      preProcess,
      rehypeCodeTitles,
      rehypePrism as any,
      postProcess,
    ]
  }});

  return {
    props: {
      postData: {
        title: postData.title,
        date: postData.date,
        contentHtml: html,
        tags: postData.tags,
        img: postData.img
      }
    },
  };
};