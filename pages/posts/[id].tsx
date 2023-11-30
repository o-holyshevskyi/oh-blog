import Layout from '../../components/layout/layout';
import { getAllPostIds, getPostData, getUniqueRelatedPosts } from '../../lib/posts';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths } from 'next';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useState } from 'react';
import { timeToRead } from '../../lib/timeToRead';
import { getContent } from '../../lib/get-content';
import { getReactions } from '../../lib/get-reactions';
import { PostProps } from '../../models/post';
import Reactions from '../../components/reactions/reactions';
import RelatedPosts from '../../components/related-posts/related-posts';
import PostTags from '../../components/post-tags/post-tags';
import PostBody from '../../components/post-body/post-body';

export default function Post({ postData, relatedPosts, reactions }: PostProps) {
  const [reactionsData, setReactionsData] = useState(reactions);
  const [hasUserReacted, setHasUserReacted] = useState({});

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
        <meta property="og:image" content={postData.img} />
        <title>{postData.title}</title>
      </Head>
      <progress max={100} value={0} className={utilStyles.progress}></progress>
      <article>
        <PostBody 
          postData={postData}
        />
        <PostTags
          postData={postData}
        />
        <RelatedPosts 
          relatedPosts={relatedPosts}
          setReactionsData={setReactionsData}
        />
        <Reactions 
          reactionsData={reactionsData}
          hasUserReacted={hasUserReacted}
          setHasUserReacted={setHasUserReacted}
          setReactionsData={setReactionsData}
        />
        <div className={utilStyles.delimiter}/>
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
  const filteredUniquePosts = await getUniqueRelatedPosts(postData);
  const timeToReadArticle = timeToRead(postData.contentHtml);
  const html = await getContent(postData);
  const reactions = await  getReactions(params?.id as string);

  return {
    props: {
      postData: {
        title: postData.title,
        date: postData.date,
        contentHtml: html,
        tags: postData.tags,
        img: postData.img,
        timeToRead: timeToReadArticle,
      },
      relatedPosts: filteredUniquePosts,
      reactions: JSON.parse(JSON.stringify(reactions)),
    },
    revalidate: 10
  };
};