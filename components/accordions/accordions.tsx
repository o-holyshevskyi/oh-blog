import { useState } from "react"
import AccordionItem from "./accordionItem";
import style from './accordions.module.css';
import AboutMeContent from "./sub-components/about-me";
import MyExperience from "./sub-components/my-experience";
import MySkills from "./sub-components/my-skills";
import Education from "./sub-components/education";
import Certificates from "./sub-components/certificates";

const faqs = [
    {
        header: 'Who am I?',
        id: 0,
        component: <AboutMeContent />
    },
    {
        header: 'My skills',
        id: 1,
        component: <MySkills />
    },
    {
        header: 'My experience',
        id: 2,
        component: <MyExperience />
    },
    {
        header: 'Education',
        id: 3,
        component: <Education />
    },
    {
        header: 'Certificates',
        id: 4,
        component: <Certificates />
    }
]

export default function Accordion() {
    const [active, setActive] = useState(null);

    const handleToggle = (index: string) => {
        if (active === index) {
            setActive(null);
        } else {
            setActive(index);
        }
    }

    return (
        <article className={style.accordionArticle}>
            {
                faqs.map((faq, index) => {
                    return (
                        <AccordionItem 
                            key={index}
                            active={active}
                            handleToggle={handleToggle}
                            faq={faq}
                            contentComponent={faq.component}
                        />
                    );
                })
            }
        </article>
    )
}