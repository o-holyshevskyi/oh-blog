import Head from "next/head";
import Layout from "../components/layout/layout";
import utilStyles from '../styles/utils.module.css';
import Accordion from "../components/accordions/accordions";

export default function About() {
    return (
        <Layout>
            <Head>
                <title>About me</title>
            </Head>
            <h2 className={utilStyles.headingLg}><span style={{color: 'red'}}>A</span>bout me</h2>
            <Accordion></Accordion>
        </Layout>
    )
}
