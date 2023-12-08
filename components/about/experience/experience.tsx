import getCurrentDate from "@/app/lib/date";
import { Divider } from "@nextui-org/divider";
import Date from "@/components/date/date";
import { title } from "@/components/primitives";

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

export default function MyExperience() {
    const experience = myExperience.sort((a, b) => {
        if (a.startTime < b.startTime) {
            return 1;
        } else {
            return -1;
        }
    })
    return (
        <>
            {
                experience.map((exp, index) => (
                    <div className="flex-col items-start justify-start mb-5 mt-5" key={index}>
                        <div className="flex h-5 items-center space-x-4 text-small mb-5">
                            <h1 className={title({ size: 'xs' })}>{exp.companyName}</h1>
                            <Divider orientation="vertical" />
                            <Date dateString={exp.startTime} />
                            <p>-</p>
                            <Date dateString={exp.endTime} />
                        </div>
                    <p>{exp.description}</p>
                    </div>
                ))
            }
        </>
    );
}