import getCurrentDate from "@/app/lib/date";
import { Divider } from "@nextui-org/divider";
import Date from "@/components/date/date";
import { title } from "@/components/primitives";
import { useTranslations } from "next-intl";
import DateDifference from "@/components/date/date-difference";

const getMyExperienceTranslation = (t: any) => {
    return [
        {
            startTime: '2019-06-01',
            endTime: '2021-08-31',
            companyName: t("TechStudioJob.companyName"),
            description: t("TechStudioJob.occupation")
        },
        {
            startTime: '2020-02-01',
            endTime: '2022-07-31',
            companyName: t("PasynSoftJob.companyName"),
            description: t("PasynSoftJob.occupation")
        },
        {
            startTime: '2022-08-01',
            endTime: getCurrentDate(),
            companyName: t("AdvantISSJob.companyName"),
            description: t("AdvantISSJob.occupation")
        }
    ];
}

export default function MyExperience({ locale } : { locale: string; }) {
    const t = useTranslations("about.aboutAccordion.experience");
    const myExperience = getMyExperienceTranslation(t);

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
                            <Date 
                                dateString={exp.startTime} 
                                locale={locale}
                            />
                            <p>-</p>
                            <Date 
                                dateString={exp.endTime} 
                                locale={locale}
                            />
                            <Divider orientation="vertical" />
                            <DateDifference 
                                dateFromString={exp.startTime}
                                dateToString={exp.endTime}
                                locale={locale}
                            />
                        </div>
                    <p>{exp.description}</p>
                    </div>
                ))
            }
        </>
    );
}