import Head from "next/head";
import Layout from "../../components/layout/layout";
import utilStyles from '../../styles/utils.module.css';
import Link from "next/link";
import Date from '../../components/date/date';
import { GetStaticProps } from "next";
import { getSortedPostsData } from "../../lib/posts";
import { useState } from "react";
import Pagination from "../../components/pagination/pagination";

const itemsPerPage = 10;

export default function AllPosts({
    allPostsData
}: {
    allPostsData: {
        date: string;
        title: string;
        tags: string[];
        id: string;
    }[];
}) {
    const [posts, setPosts] = useState(allPostsData);
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = posts.slice(startIndex, endIndex);

    let allTags = new Set();
    posts.forEach((postsData) => {
        postsData.tags.forEach((tag) => {
            allTags.add(tag);
        })
    })

    const uniqueTags = [...allTags] as string[];
    uniqueTags.push('All');

    const handleFilterTags = (tag: string) =>  {
        if (tag !== 'All') {
            const filteredTags = allPostsData.filter((post) => post.tags.includes(tag));
            if (filteredTags.length > 0) {
                setPosts(filteredTags);
            }
        } else {
            setPosts(allPostsData);
        }
    }

    return (
        <Layout>
            <Head>
                <title>All posts</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <div className={utilStyles.tagsS}>{uniqueTags.map((tag, i) => (
                    <div className={utilStyles.tagS} key={i}>
                        <div className={utilStyles.tagTextS} onClick={() => handleFilterTags(tag)}>{tag}</div>
                    </div>
                ))}</div>
                <h2 className={utilStyles.headingLg}><span className='cap'>A</span>ll posts ({posts.length})</h2>
                <ul className={utilStyles.list}>
                {displayedItems.map(({ id, date, title, tags }) => (
                    <li className={utilStyles.listItem} key={id}>
                    <Link href={`/posts/${id}`}>{title}</Link>
                    <br />
                    <small className={utilStyles.lightText}>
                        <Date dateString={date} />
                    </small>
                    <br />
                    <div className={utilStyles.tagsS}>{tags.map((tag, i) => (
                        <div className={utilStyles.tagS} key={i}>
                            <div className={utilStyles.tagTextS} onClick={() => handleFilterTags(tag)}>{tag}</div>
                        </div>
                    ))}</div>
                    <div className={utilStyles.delimiter}></div>
                    </li>
                ))}
                </ul>
            </section>
            <section className={utilStyles.pagination}>
                {posts.length > itemsPerPage 
                    ? <Pagination
                        totalItems={posts.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={onPageChange}
                        /> 
                    : <></>}
            </section>
            
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData();
    return {
      props: {
        allPostsData,
      },
    };
};