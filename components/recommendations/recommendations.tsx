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
                        Sasha's expertise in creating and executing test scripts, as well as his proficiency in various testing tools and frameworks, has been instrumental in improving our software development processes. He consistently demonstrates a deep understanding of test automation best practices and a strong commitment to delivering high-quality software products.
                    </p>
                    <br />
                    <p>
                        Sasha's attention to detail and problem-solving abilities are truly commendable. He has a knack for identifying potential issues and addressing them proactively, which has helped us catch and resolve critical defects before they impact our end-users. His thorough and methodical approach to testing ensures that our software is not only functional but also reliable.
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
                date: '2023-11-06',
                position: t("2nd.position"),
                img: '/avatars/avatar-2.png',
                description: <div>
                    <p>
                        Alex is highly skilled as a QA and eager to learn new areas and acquire new tools. He's good at keeping the product on the descent level and is really meticulous to detail, which is essential for a QA guy.
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
                <Card className="max-w-[540px] max-h-[240px] m-5">
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
            <div className="flex justify-center m-5">
            <Carousel>
                {recommendationCards}
            </Carousel>
            </div>
        </div>
        
    )
}