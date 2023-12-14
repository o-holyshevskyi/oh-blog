import { Badge, Link } from "@nextui-org/react";
import { NotificationIcon } from "./icons";
import { useTranslations } from "next-intl";

export default function Bell({ latestPostId } : { latestPostId: string }) {
    const t = useTranslations("header");
    
    return (
        <Badge content={t('navItems.newPostBadge')} shape="circle" color="danger" size="sm"> 
            <Link 
                href={`/blog/${latestPostId}`}
                aria-label="Latest post"
            >
                <NotificationIcon className="text-default-500" />
            </Link>
        </Badge>
    );
}