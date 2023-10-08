import style from './my-skills.module.css';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import Image from 'next/image';


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

export default function MySkills() {
    return (
        <div className={style.skills}>
            {skills.map((skill, index) => {
                return (
                    <div>
                        <Popover showArrow={true} placement="bottom" offset={10}>
                            <PopoverTrigger>
                                <div key={index} className={style.skill}>
                                    {skill.name}
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className={style.popover}>
                                <div className={style.popoverContent}>
                                    <div className={style.popoverHeader}>
                                        <Image src={skill.img} alt={skill.name} width={50} height={50}/>
                                        <div className={style.name}><strong>{skill.name}</strong></div>
                                    </div>
                                    <div className={style.popoverText}>{skill.description}</div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                )
            })}
        </div>
    )
}