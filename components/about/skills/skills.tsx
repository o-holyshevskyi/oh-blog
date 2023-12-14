import { Chip } from "@nextui-org/chip";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Icon } from '@iconify/react';
import { useTranslations } from "next-intl";

const getSkillsTranslation = (t: any) => [
    {
        name: 'C#',
        description: t("c#"),
        img: <Icon icon="skill-icons:cs" width={50} height={50} />
    },
    {
        name: 'TypeScript',
        description: t("typescript"),
        img: <Icon icon="skill-icons:typescript" width={50} height={50} />
    },
    {
        name: 'Playwright',
        description: t("playwright"),
        img: <Icon icon="logos:playwright" width={50} height={50} />
    },
    {
        name: 'Selenium',
        description: t("selenium"),
        img: <Icon icon="skill-icons:selenium" width={50} height={50} />
    },
    {
        name: 'Git',
        description: t("git"),
        img: <Icon icon="skill-icons:git" width={50} height={50} />
    },
    {
        name: 'API',
        description: t("api"),
        img: <Icon icon="mdi:api" width={50} height={50} />
    },
    {
        name: 'Postman',
        description: t("postman"),
        img: <Icon icon="skill-icons:postman" width={50} height={50} />
    },
    {
        name: 'SQL',
        description: t("sql"),
        img: <Icon icon="vscode-icons:file-type-sql" width={50} height={50} />
    },
    {
        name: 'Node.js',
        description: t("nodejs"),
        img: <Icon icon="skill-icons:nodejs-light" width={50} height={50} />
    },
    {
        name: 'Docker',
        description: t("docker"),
        img: <Icon icon="skill-icons:docker" width={50} height={50} />
    },
    {
        name: 'Scrum',
        description: t("scrum"),
        img: <Icon icon="iconoir:agile" width={50} height={50} />
    },
    {
        name: 'Jira',
        description: t("jira"),
        img: <Icon icon="devicon:jira" width={50} height={50} />
    },
    {
        name: 'Static testing',
        description: t("staticTesting"),
        img: <Icon icon="fluent-mdl2:test-plan" width={50} height={50} />
    },
    {
        name: 'Software testing',
        description: t("softwareTesting"),
        img: <Icon icon="fluent-mdl2:test-auto-solid" width={50} height={50} />
    },
]

export default function MySkills() {
    const t = useTranslations("about.aboutAccordion.skills.skillsDescription");

    const skills = getSkillsTranslation(t);
    
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