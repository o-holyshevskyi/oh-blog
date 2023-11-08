import Layout from '../../components/layout/layout';
import { getAllPostIds, getFilteredPosts, getPostData } from '../../lib/posts';
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
import { useEffect, useState } from 'react';
import { timeToRead } from '../../lib/timeToRead';
import clientPromise from '../../lib/mongodb';
import CommentForm from '../../components/comments/comment-form';
import Comment from '../../components/comments/comments';
import { v4 as uuidv4 } from 'uuid';
import createDate from '../../lib/createDate';

const custom = {
  pre: (props) => <Pre {...props}/>
}

export default function Post({
  postData, comments
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: MDXRemoteSerializeResult;
    tags: string[];
    img: string;
    timeToRead: number;
    relatedPosts: [
      {
        title: string;
        date: string;
        id: string;
        contentHtml: string;
      }
    ],
    reactions: {
      _id: string;
      postId: string;
      reactions:
        {
          like: number;
          heart: number;
          fire: number;
          think: number;
        }
    }[]
  };
  comments: {
    postId: string;
    text: string;
    author: string;
    date: string;
    insertedTime: number;
    _id: string;
    likes: number;
  }[]
}) {
  const [reactionsData, setReactionsData] = useState(postData.reactions);
  const [hasUserReacted, setHasUserReacted] = useState({});
  const [commentList, setCommentList] = useState(comments);

  const handleEmojiClick = async (postId: string, emoji: string) => {
    if (hasUserReacted[postId]) {
      return;
    }
    
    try {
      const response = await fetch('/api/updateReactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, emoji }),
      });

      if (response.ok) {
        setHasUserReacted((prev) => ({ ...prev, [postId]: true }));
        await fetchReactionsData(postId);
      } else {
        console.error('Failed to update reactions');
      }
    } catch (error) {
      console.error('Error updating reactions:', error);
    }
  };

  const fetchReactionsData = async (postId: string) => {
    try {
      const response = await fetch(`/api/reactions?postId=${postId}`);
      if (response.ok) {
        const newData = await response.json();
        setReactionsData(newData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCommentsData = async (postId: string) => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      if (response.ok) {
        const newData = await response.json();
        setCommentList(newData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData = async (postId: string) => {
    await fetchReactionsData(postId);
    await fetchCommentsData(postId);
  }

  const addComment = async (postId: string, text: string) => {
    const userUUID = uuidv4() as string;
    const author = `user_${userUUID.substring(0, 8)}`;
    const date = createDate();

    const response = await fetch('/api/addComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId, text, author, date }),
    });

    if (response.ok) {
      const updatedComments = await response.json();
      commentList.push(updatedComments.result)
      setCommentList(commentList);
      await fetchCommentsData(postId);
    }
  };

  const likeComment = async (id: string, postId: string) => {
    const response = await fetch('/api/updateCommentLikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      const updatedComments = await response.json();
      commentList.push(updatedComments.result)
      setCommentList(commentList);
      await fetchCommentsData(postId);
    } else {
      console.error('Failed to fetch data');
    }
  }

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
        {postData.relatedPosts.length > 0 ? (<h3>
            Related topics
        </h3>) : <></>}
        <div className={utilStyles.cardsContainer}>
          {postData.relatedPosts.map((relatedPost, index) => (
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
        <div>
          {reactionsData.map((reactionData) => {
            const { _id, postId, reactions } = reactionData;
            return (
              <div key={_id} className={utilStyles.reactionsSection}>
                <div className={utilStyles.reactions}>
                  <div className={utilStyles.reaction} onClick={() => handleEmojiClick(postId, 'like')}>
                    👍
                  </div>
                  <div className={utilStyles.reactionCount}>
                    {reactions.like}
                  </div>
                </div>
                <div className={utilStyles.reactions}>
                  <div className={utilStyles.reaction} onClick={() => handleEmojiClick(postId, 'heart')}>
                    ❤️
                  </div>
                  <div className={utilStyles.reactionCount}>
                    {reactions.heart}
                  </div>
                </div>
                <div className={utilStyles.reactions}>
                  <div className={utilStyles.reaction} onClick={() => handleEmojiClick(postId, 'fire')}>
                    🔥 
                  </div>
                  <div className={utilStyles.reactionCount}>
                    {reactions.fire}
                  </div>
                </div>
                <div className={utilStyles.reactions}>
                  <div className={utilStyles.reaction} onClick={() => handleEmojiClick(postId, 'think')}>
                    🤔 
                  </div>
                  <div className={utilStyles.reactionCount}>
                    {reactions.think}
                  </div>
                </div>
              </div>
            );
        })}
        </div>
        <div className={utilStyles.delimiter}/>
        <div>
          <CommentForm postId={reactionsData[0].postId} addComment={addComment} commentsCount={commentList.length}/>
        </div>
        <div>
        {commentList.map((comment, index) => {
            
            return (<Comment 
              comment={comment}
              likeComment={likeComment}
              key={index}
            />);
        })
        }
        </div>
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
  let relatedPosts: any[] = [];

  for (const relatedPostTag of postData.tags.slice(0, 3)) {
    const relatedPost = await getFilteredPosts(relatedPostTag.replace('#', '').toLowerCase());
    relatedPosts.push(relatedPost);
  }
  let uniquePosts: any = [];
  Array.from(new Set(relatedPosts.map((post) => post.id))).map((id) => {
    const post =  relatedPosts.find((post) => post.id === id);
    uniquePosts = post.map(obj => obj);
  });
  uniquePosts = uniquePosts.filter((post) => post.id !== postData.id);
  const filteredUniquePosts = uniquePosts.slice(0, 3);

  const timeToReadArticle = timeToRead(postData.contentHtml);
  const html = await serialize(postData.contentHtml, { mdxOptions: {
    rehypePlugins: [
      preProcess,
      rehypeCodeTitles,
      rehypePrism as any,
      postProcess,
    ]
  }});

  let reactions: any;
  try {
    const client = await clientPromise;
    const db = client.db('posts');

    const postId = params?.id as string;

    reactions = await db
      .collection('reactions')
      .find({ postId })
      .limit(1)
      .toArray();

  } catch (error) {
    console.error(error);
  }

  let comments: any;
  try {
    const client = await clientPromise;
    const db = client.db('posts');

    const postId = params?.id as string;

    comments = await db
      .collection('comments')
      .find({ postId })
      .sort({ insertedTime: -1 })
      .toArray();

  } catch (error) {
    console.error(error);
  }  

  return {
    props: {
      postData: {
        title: postData.title,
        date: postData.date,
        contentHtml: html,
        tags: postData.tags,
        img: postData.img,
        timeToRead: timeToReadArticle,
        relatedPosts: filteredUniquePosts,
        reactions: JSON.parse(JSON.stringify(reactions))
      },
      comments: JSON.parse(JSON.stringify(comments)),
    }
  };
};