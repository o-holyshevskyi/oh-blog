import { useState } from "react"
import AccordionItem from "./accordionItem";
import style from './accordions.module.css';
import AboutMeContent from "./sub-components/about-me";
import MyExperience from "./sub-components/my-experience";
import MySkills from "./sub-components/my-skills";

function getCurrentDate(): string {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

const myExperience = [
    {
        startTime: '2019-06-01',
        endTime: '2021-08-31',
        companyName: 'TechStudio',
        description: 'As a QA Engineer on the IPTV project for mobile platforms iOS and Android, I have honed my skills in quality assurance and testing. I have created test cases and other testing artifacts, and have been responsible for testing both the frontend and backend of the application. Additionally, I have taken steps to improve the efficiency of our testing processes by starting to develop automated tests for the API using C#. My experience in this role has also allowed me to share my knowledge and mentor newcomers in the team, contributing to the growth and success of the company.'
    },
    {
        startTime: '2020-02-01',
        endTime: '2022-07-31',
        companyName: 'PasynSoft LLC',
        description: 'Extensive experience on web application projects, I bring a strong technical knowledge to the table. My proficiency in using C# and TypeScript for writing automated tests has allowed me to effectively test and validate software functionality. Additionally, my experience with Selenium and the Playwright library has equipped me with the tools and skills necessary to create comprehensive test suites and ensure the highest level of software quality. In addition to my strong skills in C# and TypeScript, I am also well-versed in a range of other technologies, including JavaScript, NodeJS, SQL, Git, and Azure DevOps. These technical proficiencies have allowed me to effectively design, develop, and execute automated tests for web applications, and have equipped me with the ability to integrate my tests into a larger development workflow.'
    },
    {
        startTime: '2022-08-01',
        endTime: getCurrentDate(),
        companyName: 'AdvantISS',
        description: `As a Test Automation Engineer, I specialize in C# and TypeScript to create automated test scripts using Playwright and Selenium libraries. My strengths include building customized test frameworks tailored to project needs. I've worked on diverse projects, gaining adaptability and in-depth knowledge of software development processes. Additionally, I've mentored junior team members, sharing knowledge and ensuring high-quality results. I excel in essential tasks such as test case design and execution, contributing to project success through technical expertise and attention to detail.`
    }
];

const skills = [
    {
        name: 'C#',
        description: 'I have honed my expertise in leveraging C# and TypeScript programming languages to create robust and efficient automated test scripts',
        img: '/images/skills/csharp-50.png'
    },
    {
        name: 'TypeScript',
        description: 'I have honed my expertise in leveraging C# and TypeScript programming languages to create robust and efficient automated test scripts',
        img: '/images/skills/typescript-50.png'
    },
    {
        name: 'Playwright',
        description: 'My work revolves around ensuring the reliability and accuracy of software applications by employing the Playwright and Selenium libraries',
        img: '/images/skills/theater-masks-50.png'
    },
    {
        name: 'Selenium',
        description: 'My work revolves around ensuring the reliability and accuracy of software applications by employing the Playwright and Selenium libraries',
        img: '/images/skills/selenium-50.png'
    },
    {
        name: 'Git',
        description: 'I effectively use Git for version control, ensuring collaborative development and tracking changes in the test automation codebase',
        img: '/images/skills/git-50.png'
    },
    {
        name: 'API',
        description: 'I have hands-on experience with API testing using tools like POSTMAN, enabling thorough verification of RESTful services and API endpoints',
        img: '/images/skills/rest-api-50.png'
    },
    {
        name: 'Postman',
        description: 'Postman allows me to create and execute API requests, including GET, POST, PUT, DELETE, and more which is helpful in API testing',
        img: '/images/skills/postman-api-50.png'
    },
    {
        name: 'SQL',
        description: 'My role involves working with SQL to perform database testing, validating data integrity, and ensuring that the application interacts correctly with databases',
        img: '/images/skills/sql-50.png'
    },
    {
        name: 'Node.js',
        description: 'I have leveraged Node.js to enhance automation scripts and testing frameworks, improving their efficiency and performance',
        img: '/images/skills/nodejs-50.png'
    },
    {
        name: 'Docker',
        description: 'I have practical experience with Docker, allowing me to create and manage containerized environments for testing, promoting consistency and repeatability in testing setups',
        img: '/images/skills/docker-50.png'
    },
    {
        name: 'Scrum',
        description: 'Worked within Agile Scrum methodologies, contributing to sprint planning, backlog refinement, and daily stand-up meetings for efficient project management',
        img: '/images/skills/sprint-iteration-50.png'
    },
    {
        name: 'Jira',
        description: 'Proficient in Jira for tracking and managing project tasks, defects, and user stories, ensuring alignment with project goals',
        img: '/images/skills/jira-50.png'
    },
    {
        name: 'Static testing',
        description: 'I have contributed to static testing efforts, identifying and documenting defects in the early stages of development, resulting in reduced software maintenance costs and improved overall quality',
        img: '/images/skills/testing-50.png'
    },
    {
        name: 'Software testing',
        description: 'Contributed to the overall improvement of software quality by identifying defects and issues, reducing manual testing efforts, and ensuring the timely delivery of high-quality software products',
        img: '/images/skills/ab-testing-50.png'
    },
]

const faqs = [
    {
        header: 'Who am I?',
        id: 0,
        component: <AboutMeContent text={'As a Test Automation Engineer I possess a strong passion for both technology and serving my clients.' +
        'My unwavering energy and dedication to ensuring the best experience for my customers is reflected in my work as a skilled professional who designs, ' +
        'develops and executes automated tests to enhance software quality. With a focus on delivering top-notch results, I am a valuable asset to any team.'} />
    },
    {
        header: 'My skills',
        id: 1,
        component: <MySkills skills={skills}/>
    },
    {
        header: 'My experience',
        id: 2,
        component: <MyExperience experience={myExperience}/>
    },
    {
        header: 'Certificates',
        id: 3,
        component: <MyExperience experience={myExperience}/>
    }
]

export default function Accordion() {
    const [active, setActive] = useState(null);

    const handleToggle = (index: string) => {
        if (active === index) {
            setActive(null);
        } else {
            setActive(index);
        }
    }

    return (
        <article className={style.accordionArticle}>
            {
                faqs.map((faq, index) => {
                    return (
                        <AccordionItem 
                            key={index}
                            active={active}
                            handleToggle={handleToggle}
                            faq={faq}
                            contentComponent={faq.component}
                        />
                    );
                })
            }
        </article>
    )
}