import { Badge, Link } from "@nextui-org/react";
import { NotificationIcon } from "./icons";

export default function Bell({ latestPostId } : { latestPostId: string }) {
    return (
        <Badge content="new" shape="circle" color="danger" size="sm"> 
            <Link 
                href={`/blog/${latestPostId}`}
                aria-label="Latest post"
            >
                <NotificationIcon className="text-default-500" />
            </Link>
        </Badge>
    );
}