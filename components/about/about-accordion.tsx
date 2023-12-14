'use client';

import {Accordion, AccordionItem} from "@nextui-org/react";
import MyExperience from "./experience/experience";
import Education from "./edu/edu";
import MySkills from "./skills/skills";
import Certificates from "./certificates/certificates";
import { useTranslations } from "next-intl";

export default function AboutAccordion({ locale } : { locale: string; }) {
    const t = useTranslations("about.aboutAccordion");
    
    return (
        <section>
				<Accordion variant="splitted">
                    <AccordionItem key="1" aria-label="My experience" title={t("experience.title")}>
                        <div className="flex-col justify-start">
                            <MyExperience locale={locale}/>
                        </div>
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Education" title={t("education.title")}>
                        <div className="flex-col justify-start">
                            <Education locale={locale} />
                        </div>
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Skills" title={t("skills.title")}>
                        <div className="flex-col justify-start">
                            <MySkills />
                        </div>
                    </AccordionItem>
                    <AccordionItem key="4" aria-label="Certificates" title={t("certificates.title")}>
                        <div className="flex-col justify-start">
                            <Certificates locale={locale} />
                        </div>
                    </AccordionItem>
				</Accordion>
        </section>
    )
}