import Date from "@/components/date/date";
import { Divider } from "@nextui-org/divider";
import { useTranslations } from "next-intl";

const certificates = [
    {
        name: 'Certified Tester, Foundation Level',
        date: '2020-11-01',
        id: '20-CTFL-181825-12',
        skills: [ 'Testing,', 'Manual Testing' ],
    }, 
    {
        name: 'JavaScript Starter',
        date: '2023-02-01',
        id: 'TP64118432',
        skills: [ 'JavaScript' ],
    },
    {
        name: 'Git bases',
        date: '2023-03-01',
        id: 'TP25340100',
        skills: [ 'Git' ],
    },
];

export default function Certificates({ locale } : { locale: string }) {
    const t = useTranslations("about.aboutAccordion.certificates");
    
    return (
        <div>
            {
                certificates.map((cert, i) => (
                    <div key={i}>
                        <div className="m-[10px]">
                            <div className="flex h-5 items-center space-x-4">
                                <h2><strong>{cert.name}</strong></h2>
                                <Divider orientation="vertical" />
                                <Date 
                                    dateString={cert.date}
                                    locale={locale}
                                />
                            </div>
                            <div className="mt-5"><strong>{t("id")}:</strong> {cert.id}</div>
                            <div className="flex wrap justify-start items-center">
                                <strong className="mr-1">{t("skills")}:</strong> {
                                    cert.skills.map((skill, index) => (
                                        <div key={index} className="mr-1">
                                            {skill}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <Divider />
                    </div>
                ))
            }
        </div>
    )
}