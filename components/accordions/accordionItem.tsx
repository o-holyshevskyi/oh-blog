import { useRef } from "react";
import style from './accordions.module.css';

export default function AccordionItem({ handleToggle, active, faq }) {
    const contentEl = useRef(null);
    const { header, id, text } = faq;

    return (
        <>
            <header
                className={`${style.accordionHeader} ${active === id ? style.active : ''}`}
                onClick={() => handleToggle(id)}
            >
                <h2>{header}</h2>
                <span>+</span>
            </header>
            <div
                ref={contentEl}
                className={`${style.accordionCollapse} ${active === id ? style.show : ''}`}
                style={
                    active === id 
                    ? { height: 
                        contentEl.current.scrollHeight }
                    : { height: '0px' }
                }
            >
                <p>{text}</p>
            </div>
        </>
    )
}
