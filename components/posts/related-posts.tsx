'use client';

import { PostMeta } from "@/app/lib/posts";
import { timeToRead } from "@/app/lib/time-to-read";
import { button as buttonStyles } from "@nextui-org/theme";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { title } from "../primitives";
import { Image } from '@nextui-org/image';
import { BookIcon } from "../icons";
import { useTranslations } from "next-intl";
import Date from "../date/date";
import { useRouter } from "next-intl/client";

export default function RelatedPosts({ relatedPosts, locale } : { 
    relatedPosts: {
        meta: PostMeta;
        fileContent: string;
        description: string;
    }[];
    locale: string;
}) {
    const t = useTranslations("postPage");
    const tr = useTranslations("postCards");
    const router = useRouter();
    
    return (
        <section>
            <div className="inline-block md:max-w-6xl text-center justify-center">
                {
                relatedPosts.length > 0 && <div className="mt-8">
                    <p className={title({ color: "blue", size: 'sm' })}>{t("later_1")}</p>
                    <p className={title({ size: 'sm' })}>{t("relatedPosts")}</p>
                </div>
                }
                <div>
                    <ul className="mt-10 md:flex justify-between gap-6 text-start">
                        {relatedPosts.map((post, index) => (
                            <Card className="py-4 md:w-[50%] mb-10" key={index}>
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <div className="flex items-start items-center">
                                        <BookIcon/>
                                        <p className="text-tiny uppercase font-bold ml-1">{timeToRead(post.fileContent)} {tr("minRead")}</p>
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
                                        <small className="text-default-500">{tr("inThePost")}</small>
                                        <p>{post.description}</p>
                                    </div>
                                </CardBody>
                                <CardFooter className="bottom-0 z-10 justify-end">
                                    <Link 
                                        onClick={() => router.push(`/blog/${post.meta.slug}`)}
                                        className={`${buttonStyles({ radius: "full", color: "primary", size: 'sm' })} cursor-pointer`}
                                    >
                                        {tr("readMore")}
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}