'use client';

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Carousel from "../carousel";
import { title } from "@/components/primitives";
import { useTranslations } from "next-intl";
import { Avatar } from "@nextui-org/react";
import { ReactElement } from "react";
import Date from "../date/date";

interface RecommendationTranslations {
    title: string;
    recommendations: {
        name: string;
        date: string;
        position: string;
        description: ReactElement<any, any>;
        img: string;
    }[]
}

interface RecommendationsProps {
    locale: string;
}

const getRecommendationsTranslation = (t: any): RecommendationTranslations => {
    return {
        title: t("title"),
        recommendations: [
            {
                name: t("3rd.name"),
                date: '2024-01-31',
                position: t("3rd.position"),
                img: '/avatars/avatar-3.jfif',
                description: <div>
                    <p>
                        I am delighted to provide a strong recommendation for Oleksandr Holyshevskyi as a mentor in the realms of manual and automated testing. During our mentor-mentee collaboration, Oleksandr showcased exemplary proficiency, dedication, and a deep understanding of testing methodologies.
                    </p>
                    <br />
                    <p>
                        Oleksandr mentored me through the intricacies of both manual and automated testing, demonstrating an unparalleled combination of technical expertise and a supportive mentorship approach. Here are some key aspects that underscore his capabilities:
                    </p>
                    <br />
                    <ul>
                        <li>
                            <strong>Testing Expertise</strong>: Oleksandr exhibits a comprehensive grasp of various testing techniques, strategies, and tools. His ability to articulate intricate concepts clearly showcases his proficiency in both manual and automated testing.
                        </li>
                        <br />
                        <li>
                            <strong>Effective Communication</strong>: As a mentor, Oleksandr excels in fostering clear communication. He ensured my understanding of challenging concepts by breaking them down into digestible components. His patient response to queries and constructive feedback significantly enriched my learning journey.
                        </li>
                        <br />
                        <li>
                            <strong>Automation Guidance</strong>: Oleksandr&apos;s prowess in test automation is commendable. He introduced me to industry-standard automation tools, elucidated best practices, and guided me in implementing automated testing frameworks. This practical exposure has been invaluable in enhancing testing efficiency.
                        </li>
                        <br />
                        <li>
                            <strong>Commitment to Professional Growth</strong>: Throughout our mentorship, Oleksandr consistently exhibited a sincere commitment to my professional advancement. He actively shared relevant resources, encouraged participation in pertinent forums, and provided insights into industry trends. This holistic approach significantly contributed to my development as a testing professional.
                        </li>
                        <br />
                        <li>
                            <strong>Problem-Solving Acumen</strong>: Oleksandr&apos;s mentorship extended beyond theoretical knowledge to practical problem-solving. He encouraged me to grapple with real-world testing scenarios, fostering critical thinking and analytical skills.
                        </li>
                        <br />
                    </ul>
                    <p>
                        In conclusion, I wholeheartedly recommend Oleksandr Holyshevskyi as a mentor in manual and automated testing. His technical proficiency, unwavering dedication, and effective communication make him an exceptional mentor poised to make a significant impact on the professional development of his mentees.
                    </p>
                    <br />
                    <p>
                        Should you require further information or have any inquiries, please feel free to contact me.
                    </p>
                </div>
            },
            {
                name: t("1st.name"),
                date: '2023-11-06',
                position: t("1st.position"),
                img: '/avatars/avatar-1.png',
                description: <div>
                    <p>
                        I have had the pleasure of working with Sasha for the past few years, and I am delighted to write this letter of recommendation. Sasha is a dedicated and highly skilled professional in the field of automated testing.
                    </p>
                    <br />
                    <p>
                        Sasha&apos;s expertise in creating and executing test scripts, as well as his proficiency in various testing tools and frameworks, has been instrumental in improving our software development processes. He consistently demonstrates a deep understanding of test automation best practices and a strong commitment to delivering high-quality software products.
                    </p>
                    <br />
                    <p>
                        Sasha&apos;s attention to detail and problem-solving abilities are truly commendable. He has a knack for identifying potential issues and addressing them proactively, which has helped us catch and resolve critical defects before they impact our end-users. His thorough and methodical approach to testing ensures that our software is not only functional but also reliable.
                    </p>
                    <br />
                    <p>
                        Beyond his technical skills, Sasha is an excellent team player and collaborator. He communicates effectively with both technical and non-technical team members, making complex testing concepts easy to understand. His contributions during team meetings and his willingness to share knowledge have significantly improved the overall quality of our projects.
                    </p>
                    <br />
                    <p>
                        In conclusion, I wholeheartedly recommend Sasha for any role related to automated testing. His expertise, dedication, and positive attitude make him an asset to any organization.
                    </p>
                </div>
            },
            {
                name: t("2nd.name"),
                date: '2020-01-16',
                position: t("2nd.position"),
                img: '/avatars/avatar-2.png',
                description: <div>
                    <p>
                        Alex is highly skilled as a QA and eager to learn new areas and acquire new tools. He&apos;s good at keeping the product on the descent level and is really meticulous to detail, which is essential for a QA guy.
                    </p>
                </div>
            }
        ]
    }
}

export default function Recommendations({ locale } : RecommendationsProps) {
    const t = useTranslations("recommendations");
    const recommendationTranslations = getRecommendationsTranslation(t);
    
    const recommendationCards: JSX.Element[] = recommendationTranslations.recommendations.map((recommendation, index) => {
        return (
            <div key={index}>
                <Card className="max-w-[540px] max-h-[450px] m-5">
                    <CardHeader className="justify-between">
                    <div className="flex gap-5">
                    <Avatar isBordered color="secondary" radius="lg" size="lg" src={recommendation.img} />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{recommendation.name}</h4>
                            <Date 
                                className="text-small tracking-tight text-default-400" 
                                dateString={recommendation.date}
                                locale={locale}
                                formatDate="LLLL dd, yyyy"
                            ></Date>
                        </div>
                    </div>
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-400">
                        {recommendation.description}
                    </CardBody>
                    <CardFooter className="gap-3">
                        <div className="flex gap-1">
                            <p className=" text-default-400 text-small">{recommendation.position}</p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        );
    });
    
    return (
        <div>
            <div className="text-center mt-5">
                <p className={title({size: 'sm' })}>{recommendationTranslations.title}</p>
            </div>
            <div className="flex justify-center ">
                <Carousel>
                    {recommendationCards}
                </Carousel>
            </div>
        </div>
        
    )
}