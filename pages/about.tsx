import Head from "next/head";
import Layout from "../components/layout/layout";
import utilStyles from '../styles/utils.module.css';
import Date from "../components/date/date";
import Accordion from "../components/accordions/accordions";

export default function About() {
    return (
        <Layout>
            <Head>
                <title>About me</title>
            </Head>
            <h2 className={utilStyles.headingLg}><span style={{color: 'red'}}>A</span>bout me</h2>
            <Accordion></Accordion>
            <div>
                <Date dateString="2022-08-01"></Date> - Current
                <h4>AdvantISS</h4>
                <p>
                    Extensive experience on web application projects, I bring a strong technical knowledge to the table. 
                    My proficiency in using C# and TypeScript for writing automated tests has allowed me to effectively test and validate software functionality. 
                    Additionally, my experience with Selenium and the Playwright library has equipped me with the tools and skills necessary to create comprehensive 
                    test suites and ensure the highest level of software quality. In addition to my strong skills in C# and TypeScript, 
                    I am also well-versed in a range of other technologies, including JavaScript, NodeJS, SQL, Git, and Azure DevOps. 
                    These technical proficiencies have allowed me to effectively design, develop, and execute automated tests for web applications, 
                    and have equipped me with the ability to integrate my tests into a larger development workflow.
                </p>
                <Date dateString="2020-02-01"></Date> - <Date dateString="2022-07-31"></Date>
                <h4>PasynSoft LLC</h4>
                <p>
                    Extensive experience on web application projects, I bring a strong technical knowledge to the table. 
                    My proficiency in using C# and TypeScript for writing automated tests has allowed me to effectively test and validate software functionality. 
                    Additionally, my experience with Selenium and the Playwright library has equipped me with the tools and skills necessary to create comprehensive 
                    test suites and ensure the highest level of software quality. In addition to my strong skills in C# and TypeScript, 
                    I am also well-versed in a range of other technologies, including JavaScript, NodeJS, SQL, Git, and Azure DevOps. 
                    These technical proficiencies have allowed me to effectively design, develop, and execute automated tests for web applications, 
                    and have equipped me with the ability to integrate my tests into a larger development workflow.
                </p>
                <Date dateString="2019-06-01"></Date> - <Date dateString="2021-08-31"></Date>
                <h4>TechStudio</h4>
                <p>
                    As a QA Engineer on the IPTV project for mobile platforms iOS and Android, I have honed my skills in quality assurance and testing. 
                    I have created test cases and other testing artifacts, and have been responsible for testing both the frontend and backend of the application. 
                    Additionally, I have taken steps to improve the efficiency of our testing processes by starting to develop automated tests for the API using C#. 
                    My experience in this role has also allowed me to share my knowledge and mentor newcomers in the team, contributing to the growth and success of the company.
                </p>
            </div>
        </Layout>
    )
}
