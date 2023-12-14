import { Post } from "@/app/lib/posts";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { BookIcon } from "./icons";
import { Image } from '@nextui-org/image';
import { button as buttonStyles } from "@nextui-org/theme";
import { Link } from "@nextui-org/link";
import { timeToRead } from "@/app/lib/time-to-read";
import { useTranslations } from "next-intl";
import Date from "./date/date";
import { useRouter } from "next-intl/client";

export default function PostCards({ 
    displayedItems,
    locale
} : { 
    displayedItems: Post[];
    locale: string;
}) {
    const t = useTranslations("postCards");
    const router = useRouter();
    
    return (
        <div className="flex justify-center items-center">
            <ul className="mx-auto">
                {displayedItems.map((post, index) => (
                    <Card className="py-4 md:w-[50%] md:ml-[25%] mb-10" key={index}>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <div className="flex items-start items-center">
                                <BookIcon/>
                                <p className="text-tiny uppercase font-bold ml-1">{timeToRead(post.fileContent)} {t("minRead")}</p>
                            </div>
                            <Date 
                                dateString={post.meta.date} 
                                className="text-default-500"   
                                formatDate="LLLL d, yyyy"
                                locale={locale}
                            />
                            <h4 className="font-bold text-large">{post.meta.title}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl w-full"
                                src={post.meta.img}
                            />
                            <div className="mt-2 flex-col items-start">
                                <small className="text-default-500">{t("inThePost")}</small>
                                <p>{post.description}</p>
                            </div>
                        </CardBody>
                        <CardFooter className="bottom-0 z-10 justify-end">
                            <Link 
                                onClick={() => router.push(`/blog/${post.meta.slug}`)}
                                className={`${buttonStyles({ radius: "full", color: "primary", size: 'sm' })} cursor-pointer`}
                            >
                                {t("readMore")}
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </ul>
        </div>
    );
}