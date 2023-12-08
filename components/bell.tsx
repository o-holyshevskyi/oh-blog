import { Badge, Button, Link, Tooltip } from "@nextui-org/react";
import { NotificationIcon } from "./icons";
import style from './styles/bell.module.css';

export default function Bell({ latestPostId } : { latestPostId: string }) {
    const toolTipMessage = "Click to read the latest blog post";
    
    return (
        <div className={`fixed left-4 bottom-4 z-50 ${style.animate_ring}`}>
            <Badge content="new" shape="circle" color="danger"> 
                <Link 
                    href={`/blog/${latestPostId}`}
                >
                    <Tooltip content={toolTipMessage}>
                        <Button
                            radius="full"
                            isIconOnly
                            aria-label="latest post"
                            variant="light"
                        >
                            <NotificationIcon size={30} />
                        </Button>
                    </Tooltip>
                </Link>
            </Badge>
        </div>
    );
}