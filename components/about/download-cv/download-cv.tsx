'use client';

import { MotionWhileHover } from "@/app/[locale]/motion";
import { Link } from "@nextui-org/react";
import { useTranslations } from "next-intl";

export default function DownloadCv() {
    const t = useTranslations("about.downloadCV");

    return (
        <MotionWhileHover>
            <Link
                size="sm"
                isBlock 
                isExternal
                color="foreground"
                href="https://o-holyshevskyi.github.io/blog-pic/files/Profile.pdf"
            >
                <div className="flex flex-row gap-1">
                    {downloadIcon()}{t("download")}
                </div>
            </Link>
        </MotionWhileHover>
        
    );
}

const downloadIcon = () => (
    <svg 
        width={20} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-default-500"
    >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C10.1144 22 9.17157 22 8.58579 21.4142C8 20.8284 8 19.8856 8 18C8 16.1144 8 15.1716 8.58579 14.5858C9.17157 14 10.1144 14 12 14C13.8856 14 14.8284 14 15.4142 14.5858C16 15.1716 16 16.1144 16 18C16 19.8856 16 20.8284 15.4142 21.4142C14.8284 22 13.8856 22 12 22ZM13.8047 18.9158L12.4714 20.2492C12.2111 20.5095 11.7889 20.5095 11.5286 20.2492L10.1953 18.9158C9.93491 18.6555 9.93491 18.2334 10.1953 17.973C10.4556 17.7127 10.8777 17.7127 11.1381 17.973L11.3333 18.1683V16.2222C11.3333 15.854 11.6318 15.5556 12 15.5556C12.3682 15.5556 12.6667 15.854 12.6667 16.2222V18.1683L12.8619 17.973C13.1223 17.7127 13.5444 17.7127 13.8047 17.973C14.0651 18.2334 14.0651 18.6555 13.8047 18.9158Z" fill="currentColor"></path> 
            <path d="M6.50001 18L6.50001 17.9105C6.49991 17.0449 6.49981 16.2512 6.58661 15.6056C6.6822 14.8946 6.90709 14.1432 7.52514 13.5251C8.14319 12.9071 8.89464 12.6822 9.6056 12.5866C10.2512 12.4998 11.0449 12.4999 11.9105 12.5H12.0895C12.9551 12.4999 13.7488 12.4998 14.3944 12.5866C15.1054 12.6822 15.8568 12.9071 16.4749 13.5251C17.0929 14.1432 17.3178 14.8946 17.4134 15.6056C17.4989 16.2417 17.5001 17.0215 17.5 17.8722C20.0726 17.3221 22 15.0599 22 12.3529C22 9.88113 20.393 7.78024 18.1551 7.01498C17.8371 4.19371 15.4159 2 12.4762 2C9.32028 2 6.7619 4.52827 6.7619 7.64706C6.7619 8.33687 6.88706 8.9978 7.11616 9.60887C6.8475 9.55673 6.56983 9.52941 6.28571 9.52941C3.91878 9.52941 2 11.4256 2 13.7647C2 16.1038 3.91878 18 6.28571 18L6.50001 18Z" fill="currentColor"></path> 
        </g>
    </svg>
)
