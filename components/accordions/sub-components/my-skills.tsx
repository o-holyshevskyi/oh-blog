import style from './my-skills.module.css';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import Image from 'next/image';

export default function MySkills({
    skills
}: { skills: { 
    name: string; 
    description: string;
    img: string;
}[] }) {
    return (
        <div className={style.skills}>
            {skills.map((skill, index) => {
                return (
                    <div>
                        <Popover showArrow={true} placement="bottom" offset={10}>
                            <PopoverTrigger>
                                <div key={index} className={style.skill}>
                                    <div 
                                        style={{textAlign: 'center'}}
                                    >
                                        {skill.name}
                                    </div>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className={style.popover}>
                                <div className={style.popoverContent}>
                                    <div className={style.popoverHeader}>
                                        <Image src={skill.img} alt={skill.name} width={50} height={50}/>
                                        <div className={style.name}><strong>{skill.name}</strong></div>
                                    </div>
                                    <div className={style.popoverText}>{skill.description}</div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                )
            })}
        </div>
    )
}