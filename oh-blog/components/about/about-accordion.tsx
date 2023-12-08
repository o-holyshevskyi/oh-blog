'use client';

import {Accordion, AccordionItem} from "@nextui-org/react";
import MyExperience from "./experience/experience";
import Education from "./edu/edu";
import MySkills from "./skills/skills";
import Certificates from "./certificates/certificates";

export default function AboutAccordion() {
    return (
        <section>
				<Accordion variant="splitted">
                    <AccordionItem key="1" aria-label="My experience" title="My experience">
                        <div className="flex-col justify-start">
                            <MyExperience />
                        </div>
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Education" title="Education">
                        <div className="flex-col justify-start">
                            <Education />
                        </div>
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Skills" title="Skills">
                        <div className="flex-col justify-start">
                            <MySkills />
                        </div>
                    </AccordionItem>
                    <AccordionItem key="4" aria-label="Certificates" title="Certificates">
                        <div className="flex-col justify-start">
                            <Certificates />
                        </div>
                    </AccordionItem>
				</Accordion>
        </section>
    )
}