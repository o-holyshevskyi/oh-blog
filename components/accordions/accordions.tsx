import { useState } from "react"
import AccordionItem from "./accordionItem";
import style from './accordions.module.css';

const faqs = [
    {
        header: 'Who am I?',
        text: 'As a Test Automation Engineer I possess a strong passion for both technology and serving my clients.' +
        'My unwavering energy and dedication to ensuring the best experience for my customers is reflected in my work as a skilled professional who designs, ' +
        'develops and executes automated tests to enhance software quality. With a focus on delivering top-notch results, I am a valuable asset to any team.',
        id: 0
    },
    {
        header: 'My skills',
        text: 'As a Test Automation Engineer I possess a strong passion for both technology and serving my clients.' +
        'My unwavering energy and dedication to ensuring the best experience for my customers is reflected in my work as a skilled professional who designs, ' +
        'develops and executes automated tests to enhance software quality. With a focus on delivering top-notch results, I am a valuable asset to any team.',
        id: 1
    },
    {
        header: 'My experience',
        text: 'As a Test Automation Engineer I possess a strong passion for both technology and serving my clients.' +
        'My unwavering energy and dedication to ensuring the best experience for my customers is reflected in my work as a skilled professional who designs, ' +
        'develops and executes automated tests to enhance software quality. With a focus on delivering top-notch results, I am a valuable asset to any team.',
        id: 2
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
                        />
                    );
                })
            }
        </article>
    )
}