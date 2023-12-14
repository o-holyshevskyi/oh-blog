import { Chip } from "@nextui-org/chip";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Icon } from '@iconify/react';

const skills = [
    {
        name: 'C#',
        description: 'I have honed my expertise in leveraging C# and TypeScript programming languages to create robust and efficient automated test scripts',
        img: <Icon icon="skill-icons:cs" width={50} height={50} />
    },
    {
        name: 'TypeScript',
        description: 'I have honed my expertise in leveraging C# and TypeScript programming languages to create robust and efficient automated test scripts',
        img: <Icon icon="skill-icons:typescript" width={50} height={50} />
    },
    {
        name: 'Playwright',
        description: 'My work revolves around ensuring the reliability and accuracy of software applications by employing the Playwright and Selenium libraries',
        img: <Icon icon="logos:playwright" width={50} height={50} />
    },
    {
        name: 'Selenium',
        description: 'My work revolves around ensuring the reliability and accuracy of software applications by employing the Playwright and Selenium libraries',
        img: <Icon icon="skill-icons:selenium" width={50} height={50} />
    },
    {
        name: 'Git',
        description: 'I effectively use Git for version control, ensuring collaborative development and tracking changes in the test automation codebase',
        img: <Icon icon="skill-icons:git" width={50} height={50} />
    },
    {
        name: 'API',
        description: 'I have hands-on experience with API testing using tools like POSTMAN, enabling thorough verification of RESTful services and API endpoints',
        img: <Icon icon="mdi:api" width={50} height={50} />
    },
    {
        name: 'Postman',
        description: 'Postman allows me to create and execute API requests, including GET, POST, PUT, DELETE, and more which is helpful in API testing',
        img: <Icon icon="skill-icons:postman" width={50} height={50} />
    },
    {
        name: 'SQL',
        description: 'My role involves working with SQL to perform database testing, validating data integrity, and ensuring that the application interacts correctly with databases',
        img: <Icon icon="vscode-icons:file-type-sql" width={50} height={50} />
    },
    {
        name: 'Node.js',
        description: 'I have leveraged Node.js to enhance automation scripts and testing frameworks, improving their efficiency and performance',
        img: <Icon icon="skill-icons:nodejs-light" width={50} height={50} />
    },
    {
        name: 'Docker',
        description: 'I have practical experience with Docker, allowing me to create and manage containerized environments for testing, promoting consistency and repeatability in testing setups',
        img: <Icon icon="skill-icons:docker" width={50} height={50} />
    },
    {
        name: 'Scrum',
        description: 'Worked within Agile Scrum methodologies, contributing to sprint planning, backlog refinement, and daily stand-up meetings for efficient project management',
        img: <Icon icon="iconoir:agile" width={50} height={50} />
    },
    {
        name: 'Jira',
        description: 'Proficient in Jira for tracking and managing project tasks, defects, and user stories, ensuring alignment with project goals',
        img: <Icon icon="devicon:jira" width={50} height={50} />
    },
    {
        name: 'Static testing',
        description: 'I have contributed to static testing efforts, identifying and documenting defects in the early stages of development, resulting in reduced software maintenance costs and improved overall quality',
        img: <Icon icon="fluent-mdl2:test-plan" width={50} height={50} />
    },
    {
        name: 'Software testing',
        description: 'Contributed to the overall improvement of software quality by identifying defects and issues, reducing manual testing efforts, and ensuring the timely delivery of high-quality software products',
        img: <Icon icon="fluent-mdl2:test-auto-solid" width={50} height={50} />
    },
]

export default function MySkills() {
    return(
        <div className="flex flex-wrap justify-start items-center gap-3">
            {skills.map((skill, index) => {
                return (
                    <div key={index} >
                        <Popover 
                                showArrow={true} 
                                placement="bottom"
                                backdrop="blur"
                            >
                            <PopoverTrigger>
                                <Chip 
                                    color="primary"
                                    variant="shadow"
                                    key={index}
                                    size='lg'
                                    className="cursor-pointer"
                                >
                                    {skill.name}
                                </Chip>
                            </PopoverTrigger>
                            <PopoverContent className="bordered-lg p-6">
                                <div className="w-[260px]">
                                    <div className="flex wrap justify-between items-center mb-2">
                                        {skill.img}
                                        <strong>{skill.name}</strong>
                                    </div>
                                    <div >{skill.description}</div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                )
            })}
        </div>
    );
}