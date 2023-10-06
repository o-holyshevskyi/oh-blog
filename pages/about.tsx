import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from '../styles/utils.module.css';

export default function About() {
    return (
        <Layout>
            <Head>
                <title>About</title>
            </Head>
            <h2 className={utilStyles.headingLg}><span style={{color: 'red'}}>A</span>bout</h2>
            <div>Soon there will be more information. Keep looked forward</div>
        </Layout>
    )
}
