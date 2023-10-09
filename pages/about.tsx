import Head from "next/head";
import Layout from "../components/layout/layout";
import utilStyles from '../styles/utils.module.css';
import Accordion from "../components/accordions/accordions";
import DownloadButton from "../components/download/download-button";

export default function About() {
    return (
        <Layout>
            <Head>
                <title>About me</title>
            </Head>
            <h2 className={utilStyles.headingLg}><span className='cap'>A</span>bout me</h2>
            <Accordion></Accordion>
            <DownloadButton />
        </Layout>
    )
}
