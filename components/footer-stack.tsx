'use client';

import { Icon } from "@iconify/react";
import { Link } from "@nextui-org/link";



export default function FooterStack() {
    return (
        <div className="flex justify-center items-center">
            <p>Powered by</p>
            <Link 
                href="https://nextjs.org/"
                target="_blank"
            >
                <Icon icon="skill-icons:nextjs-dark" fontSize={32} className="m-2" />
            </Link>
            <p>deployed on</p>
            <Link 
                href="https://vercel.com/home"
                target="_blank"
            >
                <Icon icon="skill-icons:vercel-dark" fontSize={32} className="m-2" />
            </Link>
            <p>designed with</p>
            <Link 
                href="https://nextui.org/"
                target="_blank"
            >
                <Icon icon="simple-icons:nextui" fontSize={32} className="m-2 text-gray-700" />
            </Link>
        </div>
    )
}